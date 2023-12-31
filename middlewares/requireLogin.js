const jwt=require("jsonwebtoken");
const mongoose=require("mongoose");
const { jwt_secret } = require("../keys");
const USER=mongoose.model("USER");



module.exports=(req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error:"You must be logged in"})
    }
    const token=authorization.replace("Bearer ","")
    jwt.verify(token,jwt_secret,(err,payload)=>{
        if(err){
            return res.status(401).json({error:"You must be logged in"}) 
        }
        const {_id}=payload
        USER.findById(_id).then(userData=>{
            req.user=userData;
            next();
        })
    })
    
}