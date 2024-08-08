const User = require("../models/userModel")
const bcrypt=require("bcryptjs")
const jwt = require("jsonwebtoken")


function createToken(id){
    return jwt.sign({id},"super-secret-key",{
        expiresIn:"1h"
    })

}

module.exports.get_user=async (req,res)=>{
    const tumUser = await User.find({})
    res.json(tumUser)
}

module.exports.post_signup= async(req,res)=>{
    try{
       const hashedPass = await  bcrypt.hash(req.body.password,10)
   
       const newUser = new  User({
              email:req.body.email,
              username:req.body.username,
              password:hashedPass
          })
          const user = await newUser.save()
          const token = createToken(user._id)
          res.cookie("jwt",token)
          res.json(user)
          
    } catch(error){
       res.json(error)
    }
   }

module.exports.post_login=async (req,res)=>{
    const user = await User.findOne({email:req.body.email})
    if(!user) return res.json("Email wrong")

    const validate = await bcrypt.compare(req.body.password,user.password)
    if(!validate) return res.json("wrong password")

    const token = createToken(user._id)
    res.cookie("jwt",token)
    res.json("Hoşgeldiniz")
}

module.exports.get_logout=async(req,res)=>{
    res.cookie("jwt","",{maxAge:1})
    res.json("Logout işlemi good")
}