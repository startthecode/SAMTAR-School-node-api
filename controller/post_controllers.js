import { all_posts } from "../model/post_model.js";

export let get_all_posts = async (req, res) => {
  let posts = await all_posts();
  res.send(posts);
};
