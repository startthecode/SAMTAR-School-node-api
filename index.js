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
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Cors
// server.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     credential: true,
//   })
// );

//directory
let __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);
console.log(__filename);

//routes - open
server.use("/students", student_routes);
server.use("/owners", owner_routes);
server.use("/teachers", teacher_routes);

//static
server.use(express.static(__dirname + "/"));

// future delete

passport_config(server);

server.get("/auth/google", function (request, response) {
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state:"asss",
  })(request, response);
});
server.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/",
  })
  // function (req, res) {
  //   // Successful authentication, redirect home.
  //   res.redirect("/");
  // }
);

server.get("/", (req, res) => {
  let rew = req.user;
  console.log(rew);
  res.send(req.user);
});

//start server
let port = process.env.PORT || 3000;
server.listen(port, () => console.log("server listening on port " + port));
