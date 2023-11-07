import mysql from "mysql";
import "dotenv/config";

export const db_details = {
  host: process.env.DB_HOST,
  database: process.env.DB_DATABSE,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};

let db = mysql.createPool({
  ...db_details,
});

db.getConnection((err) => {
  if (err) db = () => err;
  console.log("Connection established with database");
});



export default db;
