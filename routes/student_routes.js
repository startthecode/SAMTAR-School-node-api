import express from "express";
import { get_students } from "../controller/student_controller.js";
import { chk_type } from "../middleware/chk_type.js";
let router = express.Router();
// Student Routes
export let student_routes = router.get("/", chk_type("students"), get_students);
