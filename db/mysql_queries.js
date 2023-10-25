import db from "./mysql.js";

let query = (query, value) => {
  return new Promise((resolve, reject) => {
    db.query(query, value, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

export let selectAll = (tableName) => {
  let sql = `SELECT * FROM ${tableName}`;
  return query(sql, null);
};

export let select_by_key = (tableName, key, finding_key) => {
  let sql = `SELECT * FROM ${tableName} WHERE ${key} = '${finding_key}'`;
  return query(sql, null);
};
