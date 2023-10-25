import { selectAll } from "../db/mysql_queries.js";

export let all_owners = () => {
  return selectAll("owners");
};
