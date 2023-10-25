import express from "express";
import { get_owners } from "../controller/owner_controller.js";

let router = express.Router();
// Owner Routes
export let owner_routes = router.get("/", get_owners);
