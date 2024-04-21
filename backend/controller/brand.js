const { Brand } = require("../models/brand")

exports.fetchBrands = async(req,res)=>{

    try {
        const brands = await Brand.find({}).exec()
        res.status(200).send(brands)
    } catch (error) {
        res.status(400).send(error)
    }
}


exports.createBrands = async(req,res) =>{
    const brand = new Brand(req.body)
     const response = await brand.save()
    try {
        res.status(200).send(response)
    } catch (error) {
        res.status(400).send(error)
    }
}