import express from "express";
import {
  google_callback,
  google_login,
} from "../controller/login_controller.js";
import passport from "passport";

let router = express.Router();

export let login_routes = router
  .get("/google", google_login(passport))
  .get("/google/callback", google_callback(passport));
