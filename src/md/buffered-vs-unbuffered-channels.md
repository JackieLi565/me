---
title: Unbuffered vs Channels
description:
publish: March 3, 2024
ttr: 5
tags: ["Go", "Channels", "Concurrency"]
---

Goroutines are great, they enabling the creation of lightweight execution threads that can handle multiple tasks concurrently. However, the applications we build often necessitate communication between these concurrent processes, a requirement that can be fulfilled using channels.

In Go there are two types of channels, unbuffered and buffered. Today I want to talk about the difference between the two and when to use one over the other with a simple example.

- [Unbuffered Channels](#unbuffered-channels)
- [Buffered Channels](#buffered-channel)
- [Goroutine leak](#goroutine-leak)

## Unbuffered Channels

From [the documentation](https://go.dev/doc/effective_go#channels) :

> _If the channel is unbuffered, the sender blocks until the receiver has received the value. If the channel has a buffer, the sender blocks only until the value has been copied to the buffer; if the buffer is full, this means waiting until some receiver has retrieved a value._

In other words, I like to view unbuffered channels as:

- A channel that is always full, causing the sender to wait for another goroutine to free up some room within the channel before sending.
- An unbuffered channel is a channel that is always full. It must have a goroutine take whatever the sender sends.

Below is an example of one goroutine sending data and another receiving the data:

```go
func main() {
  ch := make(chan string)
  go send(ch)
  go receive(ch)
  // wait for goroutines to finish ...
}

func send(ch chan<- string) {
  ch <- "hello receiver"
}

func receive(ch <-chan string) {
  fmt.Println(<-ch)
}
```

The resulting output of the program :

> hello receiver

This makes sense as in the `send` function we have one sender and the `receive` function has a receiver. However, if we remove the `receive` function, this line :

```go
ch <- "hello receiver"
```

will result in a [deadlock](https://www.educative.io/answers/what-is-deadlock-in-go)! As there is no receiver and the goroutine is blocking the program.

```go
func main() {
  ch := make(chan string)
  go send(ch)
  // wait for goroutines to finish ...
}

func send(ch chan<- string) {
  ch <- "hello receiver"
}
```

Program output :

> fatal error: all goroutines are asleep - deadlock!

We can simply fix this issue by introducing a buffered channel.

## Buffered Channel

A buffered channel introduces some room for the sender to send data.

```go
ch := make(chan string, CAPACITY) // e.g. 1, 2, or 3
```

Allowing the previous program to execute with no issues.

```go
func main() {
  ch := make(chan string, 1)
  go send(ch)
  // wait for goroutines to finish ...
}

func send(ch chan<- string) {
  ch <- "hello receiver"
}
```

This might not be the ideal example to fully grasp when to use buffered versus unbuffered channels. Let's explore a more practical example to better understand their use cases.

## Goroutine Leak

I highly recommend reading this article on what a [Goroutine leak](https://medium.com/golangspec/goroutine-leak-400063aef468) is if you are unfamiliar. In essence, it is a memory leak and having memory leaks will ultimately cause the programs we build to crash.

For the practical example I will be solving the following problem :

> One of our microservices receives a request from the client requiring data to be fetched from multiple instances of another microservice. The first microservice to respond with the result should have its response returned to the client.

This performance requirement is common in web services, where a microservice with multiple instances exhibits varying latencies, and the goal is to respond with the quickest one.

When approaching this problem from a coding perspective, my initial thought is to create multiple goroutines, with each one handling its own request. Since we only need the result from the first goroutine that completes, we can return as soon as the first result is received by our receiver (unbuffered channel).

```go
func requests() string {
  urls = []string{
    "https://api.microservice1.com/",
    "https://api.microservice2.com/",
    "https://api.microservice3.com/",
    "https://api.microservice4.com/",
    "https://api.microservice5.com/"
  }
  result := make(chan string)

  for _, url := range urls {
	  go get(url, result)
  }

  select { // block until first request comes back
  case r := <-result:
    return r
  }
}

func get(url string, result chan<- string) {
  resp, _ := http.Get(url)
  defer resp.Body.Close()

  body, _ := io.ReadAll(resp.Body)

  result <- string(body)
}
```

Two functions, `get`, handles a single request instance, and `requests`, create the goroutines and wait for the first response. This code looks good and works perfectly fine, except for the error handling. However, you may ask, _"What about the responses from the other goroutines?"_ Well, the other goroutines get 'hung up' since our only listener goes away when `requests` returns. This is where the goroutines start to leak, as you guessed it: the goroutines are blocked by the unbuffered channel with no receivers.

The simple fix to buffer the channel :

```go
result := make(chan string, len(urls))
```

Having a buffered channel now allows the 'hung up' goroutines to write to the channel and return. We can confirm the the goroutines are not blocked by using `runtime.NumGoroutine()` to check the number of goroutines that current exists in the program before exiting.

## Conclusion

To keep it concise, I won't detail a specific scenario favoring unbuffered channels. However, below is a list highlighting situations where an unbuffered channel is a better option than a buffered one:

- Guarantee of Immediate Processing
- Direct Synchronization
- Signal Coordination

I hope this overview has helped you grasp the differences between buffered and unbuffered channels and understand when to use each one for certain applications.
