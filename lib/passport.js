/**
 * TODO:
 * - local strategy
 ** - jwt strategy
 ** - facebook strategy
 ** - google strategy
 */
const User = require("../models/user.model.js");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const config = require("../config");

module.exports = function(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/google/callback"
      },
      function(accessToken, refreshToken, profile, cb) {
        console.log(profile)
        User.findOrCreate({ googleId: profile.id, email: profile._json.email, profileImage: profile._json.picture, name: profile._json.name }, function(err, user) {
          return cb(err, user);
        });
      }
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:5000/auth/facebook/callback"
      },
      function(accessToken, refreshToken, profile, cb) {
        console.log(profile);
        User.findOrCreate(
          { facebookId: profile.id, name: profile._json.name },
          function(err, user) {
            return cb(err, user);
          }
        );
      }
    )
  );
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.jwtSecretKey;

  passport.use(
    new JwtStrategy(opts, (jwtPayload, done) => {
      User.findOne({ _id: jwtPayload.id }, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user);
        return done(null, false);
      });
    })
  );

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      function(username, password, done) {
        User.findOne({ email: username }, function(err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false);
          }
          if (!user.verifyPassword(password)) {
            return done(null, false);
          }

          const data = {
            user: {
              email: user.email,
              name: user.name
            },
            token: user.getJwt(),
            status: "OK"
          };

          return done(null, data);
        });
      }
    )
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
