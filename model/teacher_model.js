import { selectAll } from "../db/mysql_queries.js";

export let all_teachers = () => {
  return selectAll("teachers");
};
