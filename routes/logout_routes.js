import express from "express";
import { logout } from "../controller/login_out_controller.js";
import { redirectIfLoggedOut } from "../middleware/redirectIfLoggedIn.js";

let router = express.Router();

export let logout_routes = router.get("/google", redirectIfLoggedOut, logout);
