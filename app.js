const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const ejs = require("ejs");
const passport = require("passport");
require("dotenv").config();
const config = require("./config");
// require('./lib/getExchenge.js');
const app = express();

const mongoose = require("mongoose");

mongoose.connect(
  config.mongodb_URI,
  { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true },
  error => {
    if (error) console.log(error);
    console.log("DB connected... 😄");
  }
);

const PORT = config.PORT;

// const routes = require('./routes');
const apiRoutes = require("./routes/apiRoutes/apiRoutes.js");
const authRouter = require("./routes/authRoutes.js");

app.set("view engine", "ejs");
app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors("*"));
app.use(logger("dev"));

app.use(express.static("static"));

// add passport config (strategy);
require("./lib/passport.js")(passport);
app.use(session({ secret: "keyboard cat" }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/dashboard", (req, res) => {
  const Transactions = require('./models/transactions.model.js');
  Transactions.find({})
    .then(result => {
      res.status(200).render("transaction-list", { transactions: result });
    })
    .catch(err => {
      throw new Error(err);
    });
});

app.get("/profile", (req, res) => {
  res.render("user", { user: req.user });
});

app.use("/auth", authRouter);

app.use("/api", apiRoutes);

app.use("/doc", (req, res) => {
  res.send("Documentation");
});

app.use("*", (req, res) => {
  res.redirect(404, "/doc");
});
// errorController.get404

app.use((error, req, res, next) => {
  // res.status(error.httpStatusCode).render(...);
  // res.redirect('/');
  if (error.message === "jwt expired") {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  res.status(error.httpStatusCode || 500).json({
    error: error,
    message: error.message
  });
});

app.listen(PORT, () => {
  console.log(`Server success started on ${PORT} port`);
});
