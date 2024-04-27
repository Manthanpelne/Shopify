require("dotenv").config();
const express = require("express");
const app = express();
const { Connection } = require("./db");
const cors = require("cors");
const cookies = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require("crypto");
const { isAuth, sanitizeUser, cookieExtractor } = require("./services/common");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");

//const token = jwt.sign({foo:"bar", SECRET_KEY})

//jwt options
const opts = {};
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




//webhook
const endpointSecret = process.env.webhook_signing_secret;

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      console.log({paymentIntentSucceeded})
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});





//middlewares
app.use(express.json());
app.use(cookies());
app.use(express.static("dist"));
app.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
app.use(
  session({
    secret: process.env.session_secret,
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);
//passport local strategy:
app.use(passport.authenticate("session"));



//routes
app.use("/product", isAuth(), productsRouter.router);
app.use("/category", isAuth(), categoryRouter.router);
app.use("/brand", isAuth(), brandsRouter.router);
app.use("/user", isAuth(), usersRouter.router);
app.use("/auth", authRouter.router);
app.use("/cart", isAuth(), cartRouter.router);
app.use("/orders", isAuth(), orderRouter.router);




passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email });
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
            const token = jwt.sign(sanitizeUser(user), process.env.SECRET_KEY);
            done(null, { id: user.id, role: user.role, token });
          }
        );
      } catch (error) {
        done(error);
        console.log(error);
      }
    }
  )
);

passport.use(
  "jwt",
  new JwtStrategy(opts, async (jwt_payload, done) => {
    //console.log({jwt_payload})
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, sanitizeUser(user));
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

passport.serializeUser((user, cb) => {
  //console.log("serialize",user)
  process.nextTick(() => {
    return cb(null, {
      id: user.id,
      role: user.role,
    });
  });
});

passport.deserializeUser(function (user, cb) {
  //console.log("deserealize:", user)
  process.nextTick(function () {
    return cb(null, user);
  });
});



//payments
const stripe = require("stripe")(process.env.stripe_secret_key);

app.post("/create-payment-intent", async (req, res) => {
  const { totalAmount, orderId} = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount * 100,
    currency: "inr",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
    metadata:{
      orderId
    }
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});




app.listen(8080, async () => {
  await Connection;
  console.log("server connected at port:8080");
});
