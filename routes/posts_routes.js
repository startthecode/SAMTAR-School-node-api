import express from "express";
import { get_all_posts } from "../controller/post_controllers.js";
let router = express.Router();

export let post_routes = router.get("/all", get_all_posts);
