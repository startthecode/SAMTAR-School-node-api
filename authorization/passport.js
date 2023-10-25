import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import session from "express-session";
import "dotenv/config";

// let opts = {
//   jwtFromRequest: cookieExtractor,
//   secretOrKey: process.env.JWT_SECRET,
// };
// var cookieExtractor = function (req) {
//   var token = null;
//   if (req && req.cookies) {
//     token = req.cookies["jwt"];
//   }
//   return token;
// };
// // ...
// opts.jwtFromRequest = cookieExtractor;

// passport.use(
//   new Strategy(opts, (profile, done) => {
//     if ("golashu60@gmail.com" == jwt_payload.email)
//       return done(null, { email: "golashu60@gmail.com" });
//   })
// );

let google_auth = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3200/auth/google/callback",
        scope: ["profile", "email"],
        passReqToCallback: true,
      },
      function (request,accessToken, refreshToken, profile, cb) {
        console.log('state: ' + request.query.state);

        if (true) {
          return cb(null, { email: "golashu60@gmail.com" });
        } else {
          return cb(null, { email: "golashu60@gmail.com" });
        }
      }
    )
  );

  passport.serializeUser((profile, done) => {
    return done(null, profile);
  });

  passport.deserializeUser((obj, done) => {
    return done(null, obj);
  });
};

export let passport_config = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
  google_auth();
};
