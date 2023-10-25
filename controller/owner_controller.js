import { all_owners } from "../model/owner_model.js";
export let get_owners = async (req, res) => {
  let principles = await all_owners();
  res.send(principles);
};
