import { all_teachers } from "../model/teacher_model.js";

export let get_teachers = async (req, res) => {
  let teachers = await all_teachers();
  res.send(teachers);
};
