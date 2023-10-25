import express from "express";
import { get_students } from "../controller/student_controller.js";
let router = express.Router();
// Student Routes
export let student_routes = router.get("/", get_students);
