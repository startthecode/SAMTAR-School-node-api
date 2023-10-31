import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import "dotenv/config";
import { student_routes } from "./routes/student_routes.js";
import db from "./db/mysql.js";
import { owner_routes } from "./routes/owner_routes.js";
import { teacher_routes } from "./routes/teacher_routes.js";
import session from "express-session";
import cors from "cors";
import passport from "passport";
import { passport_config } from "./authorization/passport.js";
import { login_routes } from "./routes/login_routes.js";
import { success_message } from "./constant/success_messages.js";
import { auth } from "./middleware/auth.js";

// create server
let server = express();

// cookie store
server.use(
  session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
  })
);

// json excesptions
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// cors initialize
server.use(
  cors({
    origin: process.env.CLIENT_URL,
    credential: true,
  })
);

//directory
let __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);

//static
server.use(express.static(__dirname + "/"));

// initalize passpost
passport_config(server);

//routes for content
server.get("/", (req, res) => res.send(req.user || "welcome"));
server.use("/students", auth, student_routes);
server.use("/owners", auth, owner_routes);
server.use("/teachers", auth, teacher_routes);
server.use("/login", login_routes);
server.use("*", (req, res) => res.redirect("/"));

// future delete
const encodedString =
  "s%3Amx5ZUaIdlVDwsRKiHtLkMWPNs9ooN06K.BQCjll2fcnJpN%2FVS%2FejGxC6AXcwXQPXX%2BzWDGdTuANM";
const decodedString = decodeURIComponent(encodedString);
console.log("Decoded String:", decodedString);

//start server
let port = process.env.PORT || 3000;
server.listen(port, () => console.log("server listening on port " + port));
