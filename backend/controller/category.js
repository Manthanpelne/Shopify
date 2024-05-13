const { Category } = require("../models/category");

exports.fetchCategory = async (req, res) => {
  try {
    const category = await Category.find({}).exec();
    return res.status(200).send(category);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.createCategory = async (req, res) => {
  const category = new Category(req.body);
  const response = await category.save();
  try {
    return res.status(200).send(response);
  } catch (error) {
    res.status(400).send("somthing went wrong");
  }
};
