import { selectAll, select_by_key } from "../db/mysql_queries.js";

export let all_owners = () => {
  return selectAll("owners");
};



