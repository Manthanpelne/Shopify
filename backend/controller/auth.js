const { User } = require("../models/user")

exports.createUser = async(req,res) =>{
    const user = new User(req.body)
     const response = await user.save()
    try {
        res.status(200).send(response)
    } catch (error) {
        res.status(400).send("somthing went wrong")
    }
}


exports.loginUser = async(req,res) =>{
   const user = await User.findOne({email:req.body.email})
   if(user.password===req.body.password){
       try {
           res.status(200).send(user)
           //console.log(user)
       } catch (error) {
           res.status(400).send("somthing went wrong")
       }
   }else{
    res.status(400).send(error)
   }
}