
const { User } = require("../models/user")

exports.fetchUserById = async(req,res)=>{
    const {id} = req.params
    try {
        const user = await User.findById(id).exec()
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
}


exports.createUser = async(req,res) =>{
    const user = new User(req.body)
     const response = await user.save()
    try {
        res.status(200).send(response)
    } catch (error) {
        res.status(400).send("somthing went wrong")
    }
}



exports.updateUser = async(req,res)=>{
    const {id} = req.params
    const user = await User.findByIdAndUpdate(id, req.body, {new:true})
    try {
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
}