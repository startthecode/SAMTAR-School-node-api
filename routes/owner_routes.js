import express from "express";
import {
  get_owners,
  get_unverified_users,
  update_user_verification,
} from "../controller/owner_controller.js";
import { chk_type } from "../middleware/chk_type.js";

let router = express.Router();
// Owner Routes
export let owner_routes = router
  .get("/all", get_owners)
  .get("/alluser/:user_type", chk_type("owners"), get_unverified_users)
  .patch("/updateuser", chk_type("owners"), update_user_verification);
