import express from "express";
import {
  create_new_course,
  edit_course,
  get_all_courses,
} from "../controller/courses_controller.js";
import { chk_type } from "../middleware/chk_type.js";
let router = express.Router();

export let courses_routes = router
  .get("/all", get_all_courses)
  .post("/add", chk_type("owners"), create_new_course)
  .patch("/edit", chk_type("owners"), edit_course);
