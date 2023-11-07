import { select_by_key } from "../db/mysql_queries.js";

export const auth = async (req, res, next) => {
  try {
    if (req?.user?.email) {
      let user_email = req.user.email;
      let user_session_id = req.user.session_id;
      let user_id = req.user.user_id;
      let user_type = req.user.session_for;

      let fetchUser = await select_by_key(
        req?.user?.session_for,
        "email",
        user_email
      );

      if (
        user_session_id === fetchUser[0]?.session_id &&
        user_id === fetchUser[0]?.id
      ) {
        if (fetchUser[0]?.verification_status === 1 || user_type === "owners") {
          return next();
        } else {
          return res.send(
            "Your account is under verification mode. Please wait for your account to be verified"
          );
        }
      }
    }

    return res.send(
      "Please Create a new account or login to you existing account"
    );
  } catch (err) {
    res.send(err.message);
  }
};
