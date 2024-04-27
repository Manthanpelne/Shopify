const passport = require("passport")
require("dotenv").config()

exports.isAuth = (req,res,done)=>{
   return passport.authenticate("jwt")
}

   exports.sanitizeUser = (user)=>{
return {id:user.id, role:user.role}
   }

   exports.cookieExtractor = (req)=>{
      let token = null
      if(req && req.cookies){
         token = req.cookies["jwt"]
      }
      //token = process.env.token
      return token;
   }