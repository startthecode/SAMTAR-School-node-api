import { success_message } from "../constant/success_messages.js";

export let redirectIfLoggedIn = (req, res, next) => {
  if (req?.user?.email) {
    return res.send(success_message.already_login);
  }
  return next();
};
