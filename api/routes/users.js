const router=require("express").Router();
const User=require("../models/User");
const Post=require("../models/Post");
//to update password also
const bcrypt=require("bcrypt");

//UPDATE USER
router.put("/:id",async(req,res)=>{
    if(req.body.userId === req.params._id){
        if(req.body.password)
        {
            const salt =await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password,salt);
        }
    try{
        const updatedUser =await User.findByIdAndUpdate(
        req.params.id,{
            $set:req.body,
        }, {new:true});
        res.status(200).json(updatedUser);
    }catch(err){
        res.status(500).json(err);
    }
}
else{
    res.status(401).json("You can update  only your account!");
}
});
//DELETE USER

router.delete("/:id",async(req,res)=>{
    if(req.body.userId === req.params.id){
      try{ 
        //as user can have many posts we delete them
      
        const user =await User.findById(req.params.id);
    try{
        //if we delete also here that user posts will to delete them also we add the above try block
        await Post.deleteMany({username:user.username});
        await User.findByIdAndDelete(req.params.id)
     res.status(200).json("User has been deleted...");
    }catch(err){
        res.status(500).json(err);
    }
}catch(err){
    res.status(404).json("User not found!");
}
}
else{
    res.status(401).json("You can delete only your account!");
}
});

//GET USER
// we fetch the user based on id 

router.get("/:id", async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        // when we fetch an user we not supposed to seee the user password so
        const {password, ...others}=user._doc;
        res.status(200).json(others);
    }
    catch(err)
    {
        res.status(500).json(err)
    }
})

module.exports=router