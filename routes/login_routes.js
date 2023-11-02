import express from "express";
import {
  google_callback,
  google_login,
} from "../controller/login_controller.js";
import passport from "passport";
import { redirectIfLoggedIn } from "../middleware/redirectIfLoggedIn.js";

let router = express.Router();

export let login_routes = router
  .get("/google", redirectIfLoggedIn, google_login(passport))
  .get("/google/callback", redirectIfLoggedIn, google_callback(passport));
