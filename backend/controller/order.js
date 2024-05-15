const { Order } = require("../models/order");
const { Product } = require("../models/product");
const { User } = require("../models/user");
const { sendMail, invoiceTemplate } = require("../services/common");

exports.fetchOrderByUser = async (req, res) => {
  const { id } = req.user;
  try {
    const order = await Order.find({ user: id });
    return res.status(200).send(order);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.createOrder = async (req, res) => {
  try { 
  const order = new Order(req.body);

  for (let item of order.items){
    let product = await Product.findOne({_id:item.product.id})
    product.$inc("stock",-1*item.quantity)
    await product.save()
  }

  const response = await order.save();
  const user = await User.findById(order.user)
  sendMail({to:user.email, html:invoiceTemplate(order), subject:"Order Recieved By Shopify🎉"})
    return res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error);
  }
};



exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  const result = await Order.findByIdAndDelete(id);
  try {
    return res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const response = await Order.findByIdAndUpdate(id, req.body, { new: true });
  try {
    return res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.fetchAllOrders = async (req, res) => {
  let query = Order.find({});
  let totalOrdersQuery = Order.find({});

  if (req.query.category) {
    query = query.find({ category: req.query.category });
    totalOrdersQuery = totalOrdersQuery.find({
      category: req.query.category,
    });
  }
  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
    totalOrdersQuery = totalOrdersQuery.find({
      brand: req.query.brand,
    });
  }
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

  const totalDocs = await totalOrdersQuery.count().exec();
  //console.log({totalDocs})

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    const response = await query.exec();
    res.set("X-Total-Count", totalDocs);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send("somthing went wrong");
  }
};
