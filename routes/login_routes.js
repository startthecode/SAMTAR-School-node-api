import express from "express";
import {
  google_callback,
  google_login,
  logout,
} from "../controller/login_out_controller.js";
import passport from "passport";
import {
  redirectIfLoggedIn,
  redirectIfLoggedOut,
} from "../middleware/redirectIfLoggedIn.js";

let router = express.Router();

export let login_routes = router
  .get("/google", redirectIfLoggedIn, google_login(passport))
  .get("/google/callback", redirectIfLoggedIn, google_callback(passport))
  .get("/logout", redirectIfLoggedOut, logout);
