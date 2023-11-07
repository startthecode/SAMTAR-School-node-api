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

  let permissions = {
    // by this you can edit any student post and you post(teacher)
    teachers: {
      sql: `post_id = ${post_id}  ${
        author_type === "teachers" ? "AND authorid = " + user_id : ""
      }`,
      edit_permisssions: ["students", "teachers"],
    },

    // by this you can edit only your post
    students: {
      sql: `post_id = ${post_id} AND authorid = '${user_id}'`,
      edit_permisssions: ["students"],
    },

    // by this you can edit any your post
    owners: {
      sql: `post_id = ${post_id} AND authorid = '${user_id}'`,
      edit_permisssions: ["owners", "students", "teachers"],
    },
  };
  
  let user_permission = permissions[user_type];
  if (!user_permission) return res.send(error_message.unauthorised_action);
  if (!permissions[user_type].edit_permisssions.includes(user_type))
    return error_message.unauthorised_post_edit;

  try {
    let post = await update_post(
      post_data_for_patch,
      permissions[user_type].sql
    );
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
