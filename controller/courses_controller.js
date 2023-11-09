import { error_message } from "../constant/error_messages.js";
import { success_message } from "../constant/success_messages.js";
import { mysql_error } from "../db/mysql_errors_message.js";
import {
  all_courses,
  new_course,
  update_course,
} from "../model/courses_model.js";

export let get_all_courses = async (req, res) => {
  let courses = await all_courses();
  return res.send(courses);
};

export let create_new_course = async (req, res) => {
  try {
    const courseData = {
      title: req.body.title,
      description: req.body.description,
      thumbnail: req.body.thumbnail,
      credits: req.body.credits,
    };
    let create_course = await new_course(courseData);
    return res.send(
      success_message.new_course_created + create_course.insertId
    );
  } catch (e) {
    console.log(e);
    return res.send(
      e.code ? mysql_error(e.code) : error_message.new_course_notcreated
    );
  }
};

export let edit_course = async (req, res) => {
  let course_id = req.body.course_id;
  let course_data_for_patch = {
    title: req.body.title,
    description: req.body.description,
    thumbnail: req.body.thumbnail,
    credits: req.body.credits,
  };

  let condition = `course_id = ${course_id}`;
  try {
    let course = await update_course(course_data_for_patch, condition);
    if (course.affectedRows > 0) {
      return res.status(200).send(success_message.blog_edited);
    }
    if (course.affectedRows === 0) {
      return res.status(404).send(error_message.unauthorised_course_edit);
    }
    return res.status(404).send(error_message.course_edit_id_mismatch);
  } catch (err) {
    return res.status(404).send(mysql_error(err?.code));
  }
};
