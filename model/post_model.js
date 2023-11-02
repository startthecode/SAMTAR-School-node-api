import { selectAll } from "../db/mysql_queries.js";

export let all_posts = () => {
  return selectAll("posts");
};

export let createNewPost = () => {};
