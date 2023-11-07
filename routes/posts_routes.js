import express from "express";
import {
  create_new_post,
  edit_post,
  get_all_posts,
} from "../controller/post_controllers.js";
import { chk_type } from "../middleware/chk_type.js";
let router = express.Router();

export let post_routes = router
  .get("/all", get_all_posts)
  .post("/add", create_new_post)
  .patch("/edit", edit_post);
