const googleUser = require("./models/googleUserModel");
const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors())
passport.use(googleUser.createStrategy());

passport.serializeUser(function(user, done) {
      done(null, user.id);
    });
passport.deserializeUser(async function(id, done) {
  try {
        const user = await googleUser.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:8080/auth/google/callback",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},


  function(accessToken, refreshToken, profile, cb) {
  googleUser.findOrCreate({ googleId:  profile.id, username: profile.id }, function (err, user) {
    return cb(err, user);
  });
    
  }
));
