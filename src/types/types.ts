export type Link = {
  title: string;
  href: string;
};

export type Blog = {
  // title of the blog (also used for blog id)
  title: string;
  // number of views the blog has, this will be updated a lot
  views: number;
};

export type BlogMeta = {
  // date published
  publish: Date;
  // the time if takes to read the blog
  ttr: number;
  // tags
  tags: string[];
  // Short description of the blog
  description: string;
};
