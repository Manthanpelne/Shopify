const express = require("express")
const { fetchBrands, createBrands } = require("../controller/brand")
const router = express.Router()


router.get("/",fetchBrands).post("/", createBrands)


exports.router = router