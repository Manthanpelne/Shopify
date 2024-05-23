const { Cart } = require("../models/cart");

exports.fetchCartByUser = async (req, res) => {
  const { id } = req.user;

  try {
    console.log(id, req.user);
    const cartItem = await Cart.find({ user: id }).populate("product");
    //console.log(cartItem)
    res.status(200).send(cartItem);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.addToCart = async (req, res) => {
  const { id } = req.user;
  const existing = []
  const cartItem = await Cart.find({ user: id }).populate("product");
  for(let item of cartItem){
    //const newItem = await Cart.findById({id:item.product.id})
   //console.log(item.product._id.toHexString())
   existing.push(item.product._id.toHexString())
   //console.log(existing)
   for(let i=0;i<existing.length; i++){
    //console.log(item.product._id.toHexString())
    if(existing[i]===req.body.product){
      return res.status(400).send({"msg":"Already added to cart"})
    }
   }
  }
 //console.log(newItem)
  const cart = new Cart({ ...req.body, user: id });
  const response = await cart.save();
  const result = await response.populate("product");
  
  try {
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.deleteFromCart = async (req, res) => {
  const { id } = req.params;
  const result = await Cart.findByIdAndDelete(id);
  try {
    return res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateCart = async (req, res) => {
  const { id } = req.params;
  const cart = await Cart.findByIdAndUpdate(id, req.body, { new: true });
  const response = await cart.populate("product");
  try {
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error);
  }
};
