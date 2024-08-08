const jwt = require("jsonwebtoken")

function verifyToken(req,res,next){
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token,"super-secret-key",(err)=>{
            if(err){
                console.log(err)
            }else{
                next()
            }
        })
    } else{
        res.json("Yetkiniz yok")
    }
}
module.exports={verifyToken}