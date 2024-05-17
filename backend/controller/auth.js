const passport = require("passport");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sanitizeUser, sendMail } = require("../services/common");
require("dotenv").config();

exports.createUser = async (req, res) => {
  try {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        const user = new User({ ...req.body, password: hashedPassword, salt });
        const response = await user.save();

        req.login(sanitizeUser(response), (err) => {
          if (err) {
            res.status(400).send(err);
          } else {
            const token = jwt.sign(
              sanitizeUser(response),
              process.env.SECRET_KEY
            );
            res
              .cookie("jwt", token, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
                path:"/",
                SameSite: "None",
                Secure:false
              })
              .status(200)
              .json({ id: user.id, role: user.role });
          }
        });
      }
    );
  } catch (error) {
    //fconsole.log(error)
    res.status(400).send("somthing went wrong");
  }
};

exports.loginUser = async (req, res) => {
  try {
   return res.cookie("jwt", req.user.token, {
        expires: new Date(Date.now() + 365400000),
        path:"/",
        SameSite: "None",
        Secure:false
      })
      .status(200)
      .json({ token: req.user.token, id: req.user.id, role: req.user.role });
  } catch (error) {
    res.status(400).send({ error: error });
  }
};


//logout
exports.logout = async (req, res) => {
  try {
   return res.cookie("jwt", null, {
        expires: new Date(Date.now()),
        path:"/",
        SameSite: "None",
        Secure:false
      })
      .sendStatus(200)
  } catch (error) {
    res.status(400).send({ error: error });
  }
};



exports.checkAuth = async (req, res) => {
  try {
    if (req.user) {
      res.status(200).send(req.user);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};


exports.resetPasswordReq = async (req, res) => {
  try {
    const email = req.body.email;
  const user = await User.findOne({email:email})
  if(user){
    const token = crypto.randomBytes(48).toString("hex")
    user.resetPasswordToken = token
    await user.save()

    const resetPage = "http://localhost:5173/resetPassword?token="+token+"&email="+email;
    const subject = `Reset Password`
    const html = `<p>Click <a href="${resetPage}">here</a> to reset password.</p>`
    if(req.body.email){
      const response = await sendMail({to:email, subject, html})
      res.status(200).send(response)
    }else{
      res.sendStatus(400)
    }
    }else{
      res.status(400).send({"msg":"User not found. Signup first!"})
    }
  } catch (error) {
    res.status(400).send(error)
  }
};



exports.resetPassword = async (req, res) => {
  try {
    const {email, password, token} = req.body

  const user = await User.findOne({email:email, resetPasswordToken:token})
  if(user){
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
    user.password = hashedPassword
    user.salt = salt
    await user.save()
    const subject = `Password Update 🔓`
    const html = `<p> Your password of Shopify has been successfully changed ✅ </p>`
    if(req.body.email){
      const response = await sendMail({to:email, subject, html})
      res.status(200).send(response)
    }else{
      res.sendStatus(400).send({"msg":"Invalid email"})
    }
      })
    }else{
      res.status(400).send({"msg":"User not found. Signup first!"})
    }
  } catch (error) {
    res.status(400).send(error)
  }
};

