const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
const USER=mongoose.model("USER");
const jwt=require("jsonwebtoken");
const { jwt_secret } = require("../keys");
const requireLoginJs = require("../middlewares/requireLogin.js");



router.post('/signup',(req,res)=>{
    const {name,email,userName,password}=req.body;
    if(!name||!email||!userName||!password)
    {
        return res.status(422).json({error:"Please add all fields"});
    }
    USER.findOne({ $or: [{ email: email }, { userName: userName }] }).then((savedUser)=>{
        if(savedUser)
        {
           return res.status(422).json({error:"User already exists"});
        }
        else{
            const user=new USER({
                name,
                email,
                userName,
                password
            })
        
            user.save()
                .then(user => {
                    return res.json({ message: "saved successfully" });
                })
                .catch(err => {
                    console.log(err);
                });
        }
    })

    

})

router.post('/signin',(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password)
    {
        return res.status(422).json({error:"Please add all fields"});
    }
    USER.findOne({email:email}).then((savedUser)=>{
        if(!savedUser)
        {
            return res.status(422).json({error:"Please enter valid email"});
        }
        if(password===savedUser.password){
           const token=jwt.sign({_id:savedUser.id},jwt_secret)
           const {_id,name,email,userName}=savedUser
           res.json({token,user:{_id,name,email,userName}});
           
           console.log({token,user:{_id,name,email,userName}})
        }
        else{
            return res.status(422).json({error:"Enter valid password"});
        }
    })
})

module.exports = router;