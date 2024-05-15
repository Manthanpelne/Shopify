const { query } = require("express")
const {Product} = require("../models/product")

exports.createProduct = async(req,res) =>{
    try {
    const product = new Product(req.body)
     const response = await product.save()
        res.status(200).send(response)
    } catch (error) {
        res.status(400).send("somthing went wrong")
    }
}


exports.fetchAllProducts = async(req,res) =>{
    let condition = {}
    if(!req.query.admin){
        condition.deleted = {$ne:true}
    }
    let query = Product.find(condition)
    let totalProductsQuery = Product.find(condition)

    if(req.query.category){
        query = query.find({category:{$in:req.query.category.split(",")}})
        totalProductsQuery = totalProductsQuery.find({
            category: {$in:req.query.category.split(",")}
        })
    }
    if(req.query.brand){
        query = query.find({brand:{$in:req.query.brand.split(",")}})
        totalProductsQuery = totalProductsQuery.find({
            brand: {$in:req.query.brand.split(",")}
        })
    }
    if(req.query._sort && req.query._order){
        query = query.sort({[req.query._sort]:req.query._order})
    }


    const totalDocs = await totalProductsQuery.count().exec()
    //console.log({totalDocs})


    if(req.query._page && req.query._limit){
        const pageSize = req.query._limit
        const page = req.query._page
        query = query.skip(pageSize*(page-1)).limit(pageSize)
    }

    try {
     const response = await query.exec()
     res.set("X-Total-Count", totalDocs)
        res.status(200).send(response)
    } catch (error) {
        res.status(400).send("somthing went wrong")
    }
}


exports.fetchProductById = async(req,res)=>{
    const product = []
    const {id} = req.params
    const pro = await Product.findById(id)
    product.push(pro)
    try {
        res.status(200).send(product)
    } catch (error) {
        res.status(400).send(error)
    }
}


//updateProduct
exports.updateProduct = async(req,res)=>{
    try {
    const {id} = req.params
    const product = await Product.findByIdAndUpdate(id, req.body, {new:true})
        res.status(200).send(product)
    } catch (error) {
        res.status(400).send(error)
    }
}