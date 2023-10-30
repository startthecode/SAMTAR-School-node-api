import { select_by_key } from "../db/mysql_queries.js";

export const auth = async (req, res, next) => {
  if (req?.user?.email) {
    let user_email = req.user.email;
    let fetchUser = await select_by_key(
      req?.user?.session_for,
      "email",
      user_email
    );
    console.log(user_email, fetchUser, fetchUser[0]?.verification_status);
    if (fetchUser[0]?.verification_status === 1) {
      return next();
    } else {
      return res.send(
        "Your is under verification mode. Please wait for your account to be verified"
      );
    }
  }

  return res.send(
    "Please Create a new account or login to you existing account"
  );
};
