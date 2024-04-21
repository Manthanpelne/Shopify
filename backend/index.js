const express = require("express")
const {Connection} = require("./db")
const cors  = require("cors")
const app = express()


const productsRouter = require("./routes/products")
const categoryRouter = require("./routes/category")
const brandsRouter  = require("./routes/brands")
const usersRouter = require("./routes/user")
const authRouter = require("./routes/auth")
const cartRouter = require("./routes/cart")
const orderRouter = require("./routes/order")

//middlewares
app.use(cors({
    exposedHeaders:["X-Total-Count"]
}))
app.use(express.json())
app.use("/product", productsRouter.router)
app.use("/category", categoryRouter.router)
app.use("/brand", brandsRouter.router)
app.use("/user",usersRouter.router)
app.use("/auth", authRouter.router)
app.use("/cart",cartRouter.router)
app.use("/orders",orderRouter.router,)



app.get("/",(req,res)=>{
    res.send("home")
})




app.listen(8080,async()=>{
    await Connection
    console.log("server connected at port:8080")
})