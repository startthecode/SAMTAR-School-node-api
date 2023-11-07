import { insert, selectAll, update } from "../db/mysql_queries.js";

export let all_posts = () => {
  return selectAll("posts");
};

export let new_post = (data) => {
  return insert("posts", data);
};

export let update_post = (data, condition) => {
  return update("posts", data, condition);
};
