---
title: Message Queues
description: What exactly are message queues, and how do they contribute to asynchronous processing. Additionally, what are the  benefits from using message queues in microservice communication?
publish: January 15, 2024
ttr: 9
tags: ["Message Queue", "Kafka", "Docker", "Microservices"]
---

Recently I've been reading through some user feedback for one of my work applications and noticed that when an admin or manager invites a user to the system it takes on average ~2 seconds for some sort of response. During development time it was never something I thought about until now. The first thing that came to mind was the e-mail api. I did some testing where I removed the e-mail invitations which resulted in the response feeling more snappy (as it should be). Although I found the bottleneck, I was unsure of how I could improve upon the current situation, after a bit of digging the term "message queues" frequently popped up.

But what the hell are message queues and their application in software?

According to [Amazon](https://aws.amazon.com/message-queue/#:~:text=Message%20Queue%20Basics&text=Message%20queues%20allow%20different%20parts,to%20send%20and%20receive%20messages.):

> _Message queues allow different parts of a system to communicate and process operations asynchronously. A message queue provides a lightweight buffer which temporarily stores messages, and endpoints that allow software components to connect to the queue in order to send and receive messages._

Usually definitions on a certain topic don't click with me but I thought this definition of a message queue was pretty easy to digest. However, to understand message queues I felt that the following knowledge is necessary:

- [Asynchronous vs Synchronous Processing](#asynchronous-vs-synchronous-processing)
- [Messaging Queues & The Benefits](#message-queues--the-benefits)
- [Application Example](#real-world-use-case)

In the end I'll go through a simple tutorial on how to setup [Kafka](https://kafka.apache.org/) (message queue software) using Docker and connecting to it with NodeJS.

## Asynchronous vs Synchronous Processing

Before we move on lets go back to the basics and understand what synchronous and asynchronous is.

### Synchronous Processing

Synchronous processing requires some process to fully complete before moving onto the next step. For example, we can think of a server api which a client sends a request to. While the server processes the request, the client must wait for a response before it can continue with other tasks. This is known as 'blocking' as the client is unable to complete other tasks while it waits.

<img src="/md/message-queues/synchronous.png"/>

### Asynchronous Processing

Conversely, asynchronous processing involves tasks that don't require immediate attention. Going back to the problem I faced in the beginning, sending emails shouldn't require immediate attention. Instead, the client should invite the user and continue with other tasks instead of waiting for the email request to process. This is known as 'non-blocking'.

<img src="/md/message-queues/asynchronous.png"/>

### Message Queues & The Benefits

I still haven't explained what the hell is a message queue. I like to use analogies, but from my understanding I imagine a message queue as an organized mailbox. As a client you can drop off your mail or package into the mailbox, and a mailman comes over to pick them up for processing. Although, this is a very generalized description we can use this analogy for the components of a message queue:

1. Message Producer

   - The message producer is responsible for creating the messages, or what I like to think 'the person that is sending the mail'.

2. Message Queue

   - The central component, what I like to think of as the 'Mailbox', is a storage area that temporarily holds messages.

3. Message Broker

   - The broker manages the routing, distribution, and delivery of messages, ensuring that the services receives the correct message.
   - The message broker to me is a 'do it all mail man', handling the pickups, processing, and delivery.

4. Message Consumer
   - The consumer receives the messages, this could be the person you were trying to send mail to or another service where you had to return your package to (Amazon).

Although there are more components/actors in a message queue system I find these are the most crucial ones for an introduction.

But what are a couple benefits of using a messaging queue?

1. Decoupling:

   - Components can communicate indirectly through messages without needing to be aware of each other, promoting flexibility and maintainability between services.

2. Fault Tolerance:

   - Message queues enhance fault tolerance by acting as a buffer. If one part of the system fails, messages can be retained in the queue and processed once the system is operational again.

3. Load Balancing
   - By distributing tasks across multiple instances or microservices, a message queue ensures that workloads and race conditions can be account for.

## Real World Use-case

Although I've previously mentioned a mailing system, let's take a look back at my original 'email' problem.

Now that I know what a message queue can be used for let's redesign the api that was causing client delays.

1. Remove the email logic from the api, such that it only handles creating a new user in the database.
2. Use a service like [RabbitMQ](https://www.rabbitmq.com/) or [SQS](https://aws.amazon.com/sqs/)
3. Setup a consumer to handle email message requests from the message queue.

Now handling emails is decoupled from the main service and onto its own. In the future if I were to send other types of emails and not just invitations, I could scale the email service to handler other forms.

### Kafka Example

Ok, enough with me trying to explain what a message queue is, lets see some code. I will go over a basic example of how we can use Kafka to handle communication between two 'different' services. If you would like to see the full code you can find it on my Github [here](https://github.com/JackieLi565/message-queue-example).

- [Setting up Kafka with Docker](#kafka-set-up)
- [Creating a new topic](#new-topic)
- [NodeJS connection](#nodejs-connection)

### Kafka Set-up

This is not an introduction to Docker so I'm not going to explain too much, but if you're interested in learning more I've listed a couple resources at the end.

The `docker-compose` file I'm going to use looks something like this:

```yml
version: "3"
services:
  zookeeper:
    image: "bitnami/zookeeper:latest"
    container_name: "zookeeper"
    ports:
      - "2181:2181"
    environment:
      - ALLOW_ANONYMOUS_LOGIN=yes
  kafka:
    image: "bitnami/kafka:latest"
    container_name: "kafka"
    ports:
      - "9092:9092"
    environment:
      - KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://127.0.0.1:9092
      - KAFKA_BROKER_ID=1
      - KAFKA_LISTENERS=PLAINTEXT://:9092
      - KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181
      - ALLOW_PLAINTEXT_LISTENER=yes
    depends_on:
      - zookeeper
```

Couple things we are going to need:

- Kafka image (obviously)
- Zookeeper image

[Zookeeper](https://zookeeper.apache.org/) is used for maintaining which brokers are part of which Kafka cluster. I just like to think of Zookeeper as the behind the scenes coordinator for a big school fair, where each booth within the school fair is a Kafka broker.

Some additional information we will need to remember is our Kafka and Zookeeper ports are at `9092` and `2181` respectively. Oh, and our container name is `kafka`

### New Topic

Hopefully there were no errors when you run `docker compose up <container-name>` where our container name is kafka. We will need to create a new topic. Kafka uses these things called topics; topics serve as a communication channels for producers to publish data and consumers to subscribe and process the messages.

To create a new topic, we will need to run a script within the container, for this tutorial I will name my topic `kafka-node`:

```
docker exec -it <container-name> /opt/bitnami/kafka/bin/kafka-topics.sh --bootstrap-server 127.0.0.1:9092 --create \ --topic kafka-node
```

If the script runs successfully you should receive a message in the terminal saying the 'topic was successfully created'.

### NodeJS Connection

Now that we have setup Kafka lets make a connection to see if it works! I'm going to setup a basic NodeJS project with the following `package.json`

```json
{
  "name": "kafka-node",
  "version": "1.0.0",
  "description": "Message Queue tutorial with Kafka & NodeJS",
  "scripts": {
    "start:producer": "node producer.js",
    "start:consumer": "node consumer.js"
  },
  "keywords": ["Kafka", "Node.js", "MQ", "zookeeper"],
  "author": "your-name",
  "license": "ISC",
  "dependencies": {
    "kafkajs": "^2.2.4"
  }
}
```

I will be using [kafkajs](https://kafka.js.org/) for my Kafka client but you are welcome to use other wrappers.

Create a `producer.js` and a `consumer.js` file, for this example just imagine that these are two different microservices on different servers; they could even be in two different languages. However, for simplicity I will be using JavaScript for both.

In `producer.js` I have a generator `generate()` which yields a hello message with a counter. This message will be sent to the consumer. The `produce()` function creates the Kafka connection and send the message to the queue. The function is all wrapped around a interval which sends a message to the queue for every 2 seconds.

```js
const kafkajs = require("kafkajs");

function* generate() {
  let count = 0;
  while (true) {
    yield `Hello consumer from producer: ${++count}`;
  }
}

const kafka = new kafkajs.Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();
const generator = generate();

const produce = async () => {
  const topic = "kafka-node";
  const message = {
    value: generator.next().value,
  };

  try {
    await producer.connect();

    const res = await producer.send({
      topic,
      messages: [message],
    });

    console.log(res[0]);
  } catch (e) {
    console.error(`producer error - ${e.message}`, e);
  }
};

setInterval(produce, 2000);
```

Running the script results in a sequence of response data.

Similarly, `consumer.js` connects to the same broker on port `9092` and the run function subscribes to the topic that we created. As a side note its weird not seeing the use of [event emitter](https://nodejs.org/en/learn/asynchronous-work/the-nodejs-event-emitter) pattern by kafkajs.

```js
const kafkajs = require("kafkajs");

const kafka = new kafkajs.Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const topic = "kafka-node";
const consumer = kafka.consumer({ groupId: "test-group" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ message }) => {
      console.log(`${message.offset} # ${message.value}`);
    },
  });
};

run().catch((e) => console.error(`consumer error - ${e.message}`, e));
```

The result should be a list of messages being printed out to the console.

To make sure that both 'microservices' are properly communicating run both scripts and you should see the following in the terminal

<img src="/md/message-queues/result.png"/>

Hopefully with this short example you can kinda understand the idea of a message queue.

## Conclusion

I had fun writing about this topic, and I hope it all made sense. Now, you can see the use of message queues in the world of microservices. In summary we learned the following

- What is a message queue & its benefits?
- Asynchronous & synchronous processing
- Simple hands on Kafka experience

Again this is my first-ever post and I'm only trying to improve, if there is any misleading information or something im complexly wrong about please let me know!

Oh and I didn't forget about the recommended resources:

- [Docker Tutorial by Techno Tim](https://www.youtube.com/watch?v=SnSH8Ht3MIc&ab_channel=TechnoTim)
- [Using Docker Compose](https://docs.docker.com/get-started/08_using_compose/)
