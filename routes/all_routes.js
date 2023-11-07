import { auth } from "../middleware/auth.js";
import { login_routes } from "./login_routes.js";
import { logout_routes } from "./logout_routes.js";
import { owner_routes } from "./owner_routes.js";
import { post_routes } from "./posts_routes.js";
import { student_routes } from "./student_routes.js";
import { teacher_routes } from "./teacher_routes.js";

export const all_routes = (server) => {
  //code for dev mode start
  server.get("/", (req, res) =>
    res.send(
      req.user ||
        `<a href="http://localhost:3000/login/google?loginfor=students">students</a> <br><br> <a href="http://localhost:3000/login/google?loginfor=teachers">teachers</a>
      <br><br> <a href="http://localhost:3000/login/google?loginfor=owners">Owners</a>
      `
    )
  );
  //code for dev mode end

  server.use("/students", auth, student_routes);
  server.use("/owners", auth, owner_routes);
  server.use("/teachers", auth, teacher_routes);
  server.use("/login", login_routes);
  server.use("/logout", logout_routes);
  server.use("/posts", auth, post_routes);
  // server.use("*", (req, res) => res.redirect("/"));
};
