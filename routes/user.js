const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const USER=mongoose.model("USER");
const POST = mongoose.model("POST");

router.get("/users/:id", (req, res) => {
    USER.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
        POST.find({postedBy:req.params.id})
        .populate("postedBy", "_id Photo")
        .then((post)=>{
            res.status(200).json({user,post})
        }).catch((err)=>{
            res.status(422).json({error:err})
        })
    }).catch((err)=>{
        res.status(422).json({error:err})
    })
})

router.put("/follow",requireLogin,(req, res)=>{
    USER.findByIdAndUpdate(req.body.followId,{
        $push:{follower:req.user._id}
    },{
        new:true
    },(err, result)=>{
        if(err)
        {
            return res.status(422).json({error:err});
        }
        USER.findByIdAndUpdate(req.user._id,{
            $push:{following:req.body.followId}
        },{
            new:true
        }).then(result=>{
            res.json(result)  
        }).catch(err=>{
            return res.status(422).json({error:err})
        })
    })
})
    

router.put("/unfollow",requireLogin,(req, res)=>{
    USER.findByIdAndUpdate(req.body.followId,{
        $pull:{follower:req.user._id}
    },{
        new:true
    },(err, result)=>{
        if(err)
        {
            return res.status(422).json({error:err});
        }
        USER.findByIdAndUpdate(req.user._id,{
            $pull:{following:req.body.followId}
        },{
            new:true
        }).then(result=>{
            res.json(result)  
        }).catch(err=>{
            return res.status(422).json({error:err})
        })
    })
})

router.get("/myfollowing",requireLogin,(req,res)=>{
POST.find({postedBy:{$in:req.user.following}})
 .populate("postedBy","_id name Photo")
 .populate("comments.postedBy","_id name")
.then(result=>{
    res.json(result)
}).catch(err=>{
    console.log(err)
})
})

module.exports = router;