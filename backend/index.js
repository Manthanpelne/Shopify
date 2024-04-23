const express = require("express");
const { Connection } = require("./db");
const cors = require("cors");
const app = express();
const cookies = require("cookie-parser")
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy
const crypto = require("crypto")
const {isAuth, sanitizeUser, cookieExtractor} = require("./services/common")
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require("jsonwebtoken")
require("dotenv").config()


//const token = jwt.sign({foo:"bar", SECRET_KEY})



//jwt options
const opts = {}
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.SECRET_KEY;



const productsRouter = require("./routes/products");
const categoryRouter = require("./routes/category");
const brandsRouter = require("./routes/brands");
const usersRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");
const { User } = require("./models/user");



//middlewares
app.use(cookies())
app.use(express.static("dist"))

app.use(
  session({
    secret: "keyboard cat",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);
//passport local strategy:
app.use(passport.authenticate("session"));

passport.use("local",
  new LocalStrategy(
    {usernameField:"email"},
    async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email }).exec();
      //console.log(email, password, user)
      if (!user) {
       return done(null, false, { message: "invalid credentials" });
      }
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
        if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
          return done(null, false, { message: "invalid credentials" });
        } 
        const token = jwt.sign(sanitizeUser(user), process.env.SECRET_KEY)
        done(null, { id: user.id, role: user.role, token })
      }
    )
    } catch (error) {
      done(error);
      console.log(error)
    }
  })
);


passport.use("jwt", new JwtStrategy(opts, async(jwt_payload, done) =>{
  console.log({jwt_payload})
  try {
       const user = await User.findById(jwt_payload.id)
      if(user){
        return done(null,sanitizeUser(user))
      }
      else{
        return done(null,false)
      }
     } catch (error) {
      return done(error, false)
     }
}));




passport.serializeUser((user, cb)=> {
  console.log("serialize",user)
  process.nextTick(()=> {
    return cb(null, {
      id: user.id,
     role:user.role
    });
  });
});

passport.deserializeUser(function (user, cb) {
  console.log("deserealize:", user)
  process.nextTick(function () {
    return cb(null, user);
  });
});

app.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);

app.use(express.json());
app.use("/product",isAuth(), productsRouter.router);
app.use("/category", categoryRouter.router);
app.use("/brand", brandsRouter.router);
app.use("/user", usersRouter.router);
app.use("/auth", authRouter.router);
app.use("/cart", cartRouter.router);
app.use("/orders", orderRouter.router);




app.get("/", (req, res) => {
  res.send("home");
});







app.listen(8080, async () => {
  await Connection;
  console.log("server connected at port:8080");
});

