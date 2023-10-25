import { selectAll } from "../db/mysql_queries.js";

export let all_students = () => {
  return selectAll("students");
};
