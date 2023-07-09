const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const POST = mongoose.model("POST");
const USER = mongoose.model("USER");


router.post("/createpost",requireLogin,(req,res)=>{
    const{body,pic}=req.body;
    if(!body||!pic) {
        return res.status(422).json({error:"Please Add All the fields"})
    }
    req.user;
    const post=new POST({
        body,
        photo:pic,
        postedBy:req.user
    })

    post.save().then((result)=>{
        res.json({post:result});
}).catch(err=>{
    console.log(err)
})
})

router.get("/allposts",requireLogin,(req,res)=>{
    POST.find()
    .populate("postedBy","_id name Photo")
    .populate("comments.postedBy","_id name")
    .sort("-createdAt")
    .then(posts=>res.json(posts))
    .catch(err=>console.log(err))
})

router.get("/myposts",requireLogin,(req,res)=>{
    POST.find({postedBy:req.user._id})
    .populate("postedBy","_id name Photo")
    .sort("-createdAt")
    .then((myPosts)=>{
        res.json(myPosts);
    })
    .catch(err=>console.log(err))
})

router.put("/like",requireLogin,(req,res)=>{
    POST.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).populate("postedBy","_id name Photo")
    .then((result)=>{
        res.json(result)
    }).catch((err)=>{
        res.status(422).json({error:err})
    })

})

router.put("/unlike",requireLogin,(req, res)=>{
    POST.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).populate("postedBy","_id name Photo")
    .then(( result)=>{
        res.json(result)
    }).catch((err)=>{
        res.status(422).json({error:err})
    })

})

router.put("/comment",requireLogin,(req,res)=>{
    const comment={
        comment:req.body.comment,
        postedBy:req.user._id
    }
    
    POST.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}},
        {
            new:true
        }).populate("comments.postedBy","_id name Photo")
        .populate("postedBy","_id name")
        .then((result) => {
            res.json(result);
        }).catch((err) => {
            res.status(422).json({error:err});
        })
})

router.delete("/deletePost/:postId",requireLogin,(req,res)=>{
    POST.findOne({_id:req.params.postId})
    .populate("postedBy","_id Photo")
    .then((post)=>{
        // console.log(post)
        if(!post)
        {
            return res.status(422).json({error: "error occured"})
        }
        if(post.postedBy._id.toString()==req.user._id.toString()){
            post.deleteOne()
            .then((result)=>{
                return res.json({message:"Post deleted successfully"})
            }).catch((err)=>{
                console.log(err);
            })
        }
    })
    .catch((err)=>{
        console.log(err)
        return res.status(422).json({error: err})
    })
})

router.put("/uploadProfilePic",requireLogin,(req,res)=>{
    USER.findByIdAndUpdate(req.user._id,{
        $set:{Photo:req.body.pic}
    },{
        new:true
    }).then((result)=>{
        res.json(result)
    })
    .catch((err)=>{
        res.status(422).json({error:err})
    })
    })

module.exports = router;
