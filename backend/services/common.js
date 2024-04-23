const passport = require("passport")

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
      //token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjRmYzJhNGI3ZGRjZmVkMjM3NmIyMyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxMzgxMTQxNH0.RtoJjcgyTkm0eF4G_cgq-9XoIIe1Lx0XeRdkjj3EORY"
      return token;
   }