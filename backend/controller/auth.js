const passport = require("passport");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sanitizeUser } = require("../services/common");
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
      httpOnly: true
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
    res
      .cookie("jwt", req.user.token, {
        expires: new Date(Date.now() + 3600000),
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

exports.checkAuth = async (req, res) => {
  try {
    if (req.user) {
      res.status(200).send(req.user);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
