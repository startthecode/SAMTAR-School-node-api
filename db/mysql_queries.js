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

export let insert = (table_name, data) => {
  let sql = `INSERT INTO ${table_name} SET ?`;
  return query(sql, data);
};

export let update = (table_name, data, condition) => {
  // let whereCondition = "";
  // for (const key in condition) {
  //   if (condition.hasOwnProperty(key))
  //     whereCondition += ` ${key} =  '${condition[key]}' AND `;
  // }
  // whereCondition = whereCondition.slice(0, -5);
  let sql = `UPDATE ${table_name} SET ? where ${condition}`;
  console.log(table_name, data, condition);
  return query(sql, data);
};

// export let insert_with_columname = (table_name, column_name, data) => {
//   let convertToString = Object.values(data)
//     .map((val) => `"${val}"`)
//     .join(",");
//   let sql = `INSERT INTO ${table_name} ${column_name} values (${convertToString})`;
//   return query(sql, data);
// };
