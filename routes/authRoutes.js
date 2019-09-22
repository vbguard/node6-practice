const router = require("express").Router();
const authController = require("../controllers/authController.js");
const authCheck = require("../middleware/authCheck.js");
const passport = require("passport");

// const passportCheck = passport.authenticate('local');

// router.post('/login', authController.login);
router.get("/facebook", passport.authenticate("facebook", { session: false, scope: ["email"] }));
router.get("/facebook/callback", passport.authenticate("facebook", { session: false }), (req,res) => {
  res.redirect("/");
});
router.get("/google", passport.authenticate("google", { session: false, scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { session: false }), (req,res) => {
  res.redirect("/");
})
router.post("/login", authController.passportLogin);
router.post("/register", authController.register);
router.get("/logout", authCheck, authController.logout);

module.exports = router;
