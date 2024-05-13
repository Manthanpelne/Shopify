const passport = require("passport")
const nodemailer = require("nodemailer")
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

  
 //email
const transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
   port: 587,
   secure: false, // Use `true` for port 465, `false` for all other ports
   auth: {
     user: "manthanpelneoo7@gmail.com",
     pass: process.env.MAIL_PASSWORD,
   },
 });

 exports.sendMail = async({to, subject, text, html})=>{
      const info = await transporter.sendMail({
        from: '"Shopify E-commerce" <manthanpelneoo7@gmail.com>', // sender address
        to:to, // list of receivers
        subject:subject, // Subject line
        text: text, // plain text body
        html: html, // html body
      });
return info;
 }
   


   
    