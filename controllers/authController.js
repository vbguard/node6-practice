const Users = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const passport = require("passport");

exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let userData;
  Users.findOne({ email, password })
    .then(user => {
      if (!user) {
        return res
          .status(400)
          .json({ status: "BAD", message: "User not found or not registered" });
      }

      console.log(user.verifyPassword("password"));

      userData = user;
      const token = jwt.sign(
        { id: user._id, email: user.email },
        "secret_key",
        { expiresIn: 100 }
      );
      return token;
    })
    .then(token => {
      userData.token = token;
      userData
        .save()
        .then(result => {
          if (result) {
            return res.status(201).json({
              status: "OK",
              user: {
                name: result.name,
                email: result.email
              },
              token: token,
              message: "User successful login!!!"
            });
          }
          if (!result) {
            return res
              .status(400)
              .json({ status: "BAD", message: "some error", result: result });
          }
        })
        .catch(err => {
          throw new Error(err);
        });
    })
    .catch(err => {
      throw new Error(err);
    });
};

exports.passportLogin = (req, res) => {
  passport.authenticate("local", (err, user, info) => {
    if (err || !user) {
      const infoMessage = info || { message: "Login failed" };
      return res.status(400).json(infoMessage);
    }

    req.login(user, { session: false }, err => {
      if (err) {
        return res.status(400).json(infoMessage);
      }
      return res.status(200).json({ status: "OK", ...user });
    });
  })(req, res);
};

exports.register = (req, res) => {};

exports.logout = (req, res) => {
  const email = req.user.email;
  const userId = req.user.id;

  Users.findOne({ email, _id: userId })
    .then(user => {
      if (!user) {
        return res.status(400).json({
          status: "BAD",
          message: "User not found"
        });
      }
      if (user) {
        user.token = undefined;
        user
          .save()
          .then(updatedUser => {
            if (updatedUser) {
              req.logout();
              return res
                .status(200)
                .json({ status: "OK", message: "User successful logout!!!" });
            }
          })
          .catch(err => {
            throw new Error(err);
          });
      }
    })
    .catch(err => {
      throw new Error(err);
    });
};
