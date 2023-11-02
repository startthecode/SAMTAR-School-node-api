import { error_message } from "../constant/error_messages.js";
import { mysql_error } from "../db/mysql_errors_message.js";

export let google_login = (passport) =>
  function (request, response) {
    request.session.returnUrl = request.headers.referer || "/";
    let user = request.query.loginfor;
    if (user !== "students" && user !== "teachers" && user !== "owners")
      return response.status(404).send(error_message.google_login_wrong_query);

    passport.authenticate("google", {
      state: request.query.loginfor,
    })(request, response);
  };

export let google_callback = (passport) => {
  return function (req, res, next) {
    let returnUrl = req.session.returnUrl;
    delete req.session.returnUrl;
    passport.authenticate("google")(req, res, function (err) {
      if (err) {
        let response_err = encodeURIComponent(
          err?.code ? mysql_error(err?.code) : err
        );
        return res.redirect(`${returnUrl}?error=${response_err}`);
      }
      res.redirect("/");
    });
  };
};
