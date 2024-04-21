const express = require("express");
const { addToCart } = require("../controller/cart.js");
const { fetchCartByUser } = require("../controller/cart.js");
const { deleteFromCart } = require("../controller/cart.js");
const { updateCart } = require("../controller/cart.js");

const router = express.Router();

router.post("/", addToCart)
.get("/", fetchCartByUser)
.delete("/:id",deleteFromCart)
.patch("/:id",updateCart)


exports.router = router;
