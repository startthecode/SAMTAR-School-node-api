import { all_students } from "../model/student_model.js";

export let get_students = async (req, res) => {
  let students = await all_students();
  res.send(students);
};
