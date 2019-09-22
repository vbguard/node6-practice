const jwt = require("jsonwebtoken");
const Users = require("../models/user.model.js");

module.exports = (req, res, next) => {
  const headers = req.headers;
  const token = headers.authorization.replace("Bearer ", "");


  const verifyToken = jwt.verify(token, "secret_key");

  if (verifyToken) {
    Users.findOne({ email: verifyToken.email, token: token })
      .then(user => {
        if (!user) {
          throw new Error({ message: "jwt expired" });
        }

        if (user) {
          req.user = {
            id: verifyToken.id,
            email: verifyToken.email
          };

          return next();
        }
      })
      .catch(err => {
        throw new Error(err);
      });
  }
};
