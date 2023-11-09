import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import "dotenv/config";
import session from "express-session";
import cors from "cors";
import { passport_config } from "./authorization/passport.js";
import MySQLStoreImport from "express-mysql-session";
import { db_details } from "./db/mysql.js";
import { all_routes } from "./routes/all_routes.js";

// create server
let server = express();

// cookie store using mysql database
const MySQLStore = MySQLStoreImport(session);
const sessionStore = new MySQLStore(db_details);
server.use(
  session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
  })
);

// json excesptions
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// cors initialize
server.use(
  cors({
    credentials: true,
  })
);

//directory
let __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);

//static path
server.use(express.static(__dirname + "/"));

// initalize passpost
passport_config(server);

//routes
all_routes(server);

// //code for dev mode start

// //code for dev mode end

//start server
let port = process.env.PORT || 3000;
server.listen(port, () => console.log("server listening on port " + port));
