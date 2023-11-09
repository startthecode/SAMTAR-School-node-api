import { error_message } from "../constant/error_messages.js";
import { success_message } from "../constant/success_messages.js";
import { mysql_error } from "../db/mysql_errors_message.js";
import { all_posts, new_post, update_post } from "../model/post_model.js";

export let get_all_posts = async (req, res) => {
  let posts = await all_posts();
  res.send(posts);
};

export let create_new_post = async (req, res) => {
  try {
    const postData = {
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      seo_title: req.body.seo_title,
      seo_description: req.body.seo_description,
      featured_image: req.body.featured_image,
      author_type: req.user.session_for,
      authorid: req.user.user_id,
    };
    let create_post = await new_post(postData);
    return res.send(success_message.new_post_created + create_post.insertId);
  } catch (e) {
    console.log(e);
    return res.send(
      e.code ? mysql_error(e.code) : error_message.new_post_notcreated
    );
  }
};

let edit_all_posts = async (req, res) => {
  try {
    let post_data_for_patch = {
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      seo_title: req.body.seo_title,
      seo_description: req.body.seo_description,
      featured_image: req.body.featured_image,
    };

    if (author_type !== "owners")
      return res.send(error_message.unauthorised_post_edit);

    let condition = `post_id =  '${req.body.post_id}'`;
    let post = await update_post(post_data_for_patch, condition);

    if (post.affectedRows > 0) {
      return res.status(200).send(success_message.blog_edited);
    }
    return res.status(404).send(error_message.post_edit_id_mismatch);
  } catch (err) {
    return res.status(404).send(mysql_error(err?.code));
  }
};

let edit_post_by_author = async (req, res) => {
  try {
    let post_id = req.body.post_id;
    let user_id = req.user.user_id;
    let author_type = req.body.author_type;
    let post_data_for_patch = {
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      seo_title: req.body.seo_title,
      seo_description: req.body.seo_description,
      featured_image: req.body.featured_image,
    };

    if (author_type !== "teachers")
      return res.send(error_message.unauthorised_post_edit);

    let condition_sql = `post_id = ${post_id}  ${
      author_type === "teachers" ? "AND authorid = " + user_id : ""
    }`;

    let post = await update_post(post_data_for_patch, condition_sql);
    if (post.affectedRows > 0) {
      return res.status(200).send(success_message.blog_edited);
    }
    if (post.affectedRows === 0) {
      return res.status(404).send(error_message.unauthorised_post_edit);
    }
    return res.status(404).send(error_message.post_edit_id_mismatch);
  } catch (err) {
    return res.status(404).send(mysql_error(err?.code));
  }
};

let edit_post_by_id = async (req, res) => {
  try {
    let post_id = req.body.post_id;
    let user_id = req.user.user_id;
    let author_type = req.body.author_type;
    let post_data_for_patch = {
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      seo_title: req.body.seo_title,
      seo_description: req.body.seo_description,
      featured_image: req.body.featured_image,
    };

    if (author_type !== "students")
      return res.send(error_message.unauthorised_post_edit);

    let condition_sql = `post_id = ${post_id} AND authorid = '${user_id}'`;

    let post = await update_post(post_data_for_patch, condition_sql);
    if (post.affectedRows > 0) {
      return res.status(200).send(success_message.blog_edited);
    }
    if (post.affectedRows === 0) {
      return res.status(404).send(error_message.unauthorised_post_edit);
    }
    return res.status(404).send(error_message.post_edit_id_mismatch);
  } catch (err) {
    return res.status(404).send(mysql_error(err?.code));
  }
};

export let edit_post = async (req, res) => {
  let user_type = req.user.session_for;
  let post_id = req.body.post_id;
  let user_id = req.user.user_id;
  let author_type = req.body.author_type;
  let post_data_for_patch = {
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    seo_title: req.body.seo_title,
    seo_description: req.body.seo_description,
    featured_image: req.body.featured_image,
  };

  if (user_type === "owners") {
    let all_post_edit = await edit_all_posts(req, res);
    return all_post_edit;
  } else if (user_type === "teachers") {
    let author_by_post_edit = await edit_post_by_author(req, res);
    return author_by_post_edit;
  } else if (user_type === "students") {
    return edit_post_by_id(req, res);
  }
};
