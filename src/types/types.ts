export type Link = {
  title: string;
  href: string;
};

export type Blog = {
  // title of the blog (also used for blog id)
  title: string;
  // number of views the blog has, this will be updated alot
  views: number;
  // date published
  publish: Date;
  // the time if takes to read the blog
  ttr: number;
  // tags
  tags: string[];
};
