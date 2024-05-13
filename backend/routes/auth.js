const express = require("express");
const { createUser, resetPasswordReq, resetPassword } = require("../controller/auth");
const { loginUser, checkAuth } = require("../controller/auth");
const passport = require("passport");

const router = express.Router();

router
  .post("/signup", createUser)
  .post("/login", passport.authenticate("local"), loginUser)
  .get("/check", passport.authenticate("jwt"), checkAuth)
  .post("/reset-password-request", resetPasswordReq)
  .post("/reset-password",resetPassword)

exports.router = router;
