import mysql from "mysql";
import "dotenv/config";

let db = mysql.createPool({
  host: process.env.DB_HOST,
  database: process.env.DB_DATABSE,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

db.getConnection((err) => {
  if (err) throw err;
  console.log("Connection established with database");
});

export default db;
