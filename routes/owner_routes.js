import express from "express";
import { get_owners } from "../controller/owner_controller.js";
import { chk_type } from "../middleware/chk_type.js";

let router = express.Router();
// Owner Routes
export let owner_routes = router.get("/", chk_type("owners"), get_owners);
