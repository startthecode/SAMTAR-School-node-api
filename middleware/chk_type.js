import { error_message } from "../constant/error_messages.js";

export let chk_type = (user_type) => {
  return (req, res, next) => {
    if (req.user.session_for === user_type) return next();
    return res.send(error_message.unauthorised_Api_access);
  };
};
