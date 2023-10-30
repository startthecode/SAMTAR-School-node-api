import { error_message } from "../constant/error_messages.js";

export let google_login = (passport) =>
  function (request, response) {
    let user = request.query.loginfor;
    if (user !== "students" && user !== "teachers" && user !== "owners")
      return response.status(404).send(error_message.google_login_wrong_query);

    passport.authenticate("google", {
      state: request.query.loginfor,
    })(request, response);
  };

export let google_callback = (passport) => {
  return passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/",
  });
  // , function (req, res) {
  //   // Successful authentication, redirect home.
  //   res.redirect("/");
  // }
};
