import express from "express";
import { get_teachers } from "../controller/teacher_controller.js";
import { chk_type } from "../middleware/chk_type.js";
let router = express.Router();
// Teacher Routes
export let teacher_routes = router.get("/", chk_type("teachers"), get_teachers);
