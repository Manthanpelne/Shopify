const { Cart } = require("../models/cart")

exports.fetchCartByUser = async(req,res)=>{
    const {user} = req.query
    try {
        const cartItem = await Cart.find({user:user}).populate("user").populate("product")
        res.status(200).send(cartItem)
    } catch (error) {
        res.status(400).send(error)
    }
}


exports.addToCart = async(req,res) =>{
    const cart = new Cart(req.body)
     const response = await cart.save()
     const result = await response.populate("product")
    try {
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error)
    }
}


exports.deleteFromCart = async(req,res) =>{
    const {id} = req.params
     const result = await Cart.findByIdAndDelete(id)
    try {
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error)
    }
}


exports.updateCart = async(req,res)=>{
    const {id} = req.params
    const cart = await Cart.findByIdAndUpdate(id, req.body, {new:true})
    const response = await cart.populate("product")
    try {
        res.status(200).send(response)
    } catch (error) {
        res.status(400).send(error)
    }
}