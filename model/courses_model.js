import { insert, selectAll, update } from "../db/mysql_queries.js";

export let all_courses = () => {
  return selectAll("courses");
};

export let new_course = (data) => {
  return insert("courses", data);
};

export let update_course = (data, condition) => {
  return update("courses", data, condition);
};
