import { error_message } from "../constant/error_messages.js";
import { success_message } from "../constant/success_messages.js";
import { mysql_error } from "../db/mysql_errors_message.js";
import { selectAll, select_by_key, update } from "../db/mysql_queries.js";
import { all_owners } from "../model/owner_model.js";

export let get_owners = async (req, res) => {
  let principles = await all_owners();
  res.send(principles);
};

export let get_unverified_users = async (req, res) => {
  if (!["teachers", "students"].includes(req.params.user_type))
    return res.send(error_message.wrong_url);
  let condition = `verification_status = ${false}`;
  let get_data = "*";
  let users = await selectAll(req.params.user_type);
  return res.send(users);
};

export let update_user_verification = async (req, res) => {
  try {
    let patch_user_type = req.body.patch_user_type;
    console.log(req.body);
    if (!["teachers", "students"].includes(patch_user_type))
      return res.send(error_message.wrong_user_type);
    let data_for_patch = {
      verification_status: req.body.patch_verification_status,
    };
    let condition = `id = ${req.body.patch_id}`;
    let users = await update(patch_user_type, data_for_patch, condition);
    if (users.affectedRows > 0) {
      return res.status(200).send(success_message.user_status_updated);
    }
    return res.status(404).send(error_message.wrong_user_id);
  } catch (err) {
    console.log(err);
    return res.status(404).send(mysql_error(err?.code));
  }
};
