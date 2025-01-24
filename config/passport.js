import { passwordUtils } from "../passportUtils.js";
import passport from "passport";
import localStrategy from "passport-local";
import connection from "./database.js";
const User = connection.models.User;

const strategyLocal = localStrategy.Strategy;
const genPassword = passwordUtils.genPassword;
const customFields = {
   usernameField: "uname",
   passwordField: "pw",
};

const verifyCallback = (username, password, done) => {
   User.findOne({ username: username })
      .then((user) => {
         if (!user) {
            return done(null, false);
         }

         // Function defined at bottom of app.js
         const isValid = validPassword(password, user.hash, user.salt);

         if (isValid) {
            return done(null, user);
         } else {
            return done(null, false);
         }
      })
      .catch((err) => {
         done(err);
      });
};

const strategy = new strategyLocal(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
   done(null, user.id);
});
passport.deserializeUser((userId, done) => {
   User.findById(userId)
      .then((user) => {
         done(null, user);
      })
      .catch((err) => done(err));
});
