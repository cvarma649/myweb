const express=require("express")
const router=express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config()
const cors= require("cors");
const pool = require("./db");
const mailgun = require("mailgun-js");
const DOMAIN = process.env.mailgun_domain;
const mg = mailgun({apiKey: process.env.mailgun_apikey, domain: DOMAIN});
const bodyParser= require("body-parser");
const urlencoder = bodyParser.urlencoded({extended:true});
const bodyJson = bodyParser.json();

router.use(express.json())
router.use(bodyJson)
router.use(urlencoder)

router.put("/", async(req,res)=>{
    const {email} = req.body;
    const user_id = await pool.query("SELECT user_id FROM users WHERE email = $1", [email]);
    try {  
        if (user_id){
            try {
                const token=jwt.sign({user:user_id},process.env.jwt_ForgotPassword_Secret,{expiresIn:"20m"})
                const data = {
                from: 'no-reply@chhavimyweb.com',
                to: email,
                subject: 'Reset Password Link',
                text: `<h1>Please Click on the link to reset password!</h1>
                <a>${process.env.client_url}/reset-password/${token}</a>`};
    
                const updateResetLink= await pool.query("UPDATE users SET reset_link = $1 WHERE user_id = $2",[token,user_id])
                mg.messages().send(data, (error,body)=>{
                    if(error){
                        return res.json("nahi garbar hai")
                    }else{
                        return res.json("Reset Email has been sent!")
                    }
                })
                res.send("Reset Link Sent")
            } catch (error) {
                res.send("Invalid Email")
            }
           
        }else{
            return res.status(200).json("User does not Exist")
        }}
        catch{
            res.send("Email error")
        }
   
 
})


module.exports = router;