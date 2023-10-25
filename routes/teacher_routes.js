import express from "express";
import { get_teachers } from "../controller/teacher_controller.js";
let router = express.Router();
// Teacher Routes
export let teacher_routes = router.get("/", get_teachers);
