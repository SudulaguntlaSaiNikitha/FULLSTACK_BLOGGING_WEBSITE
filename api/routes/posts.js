// const router=require("express").Router();
// const User=require("../models/User");
// const Post=require("../models/Post");


// //CREATE NEW POST
// router.post("/",async(req,res)=>{


// });
// //UPDATE POST

// router.delete("/:id",async(req,res)=>{
//     if(req.body.userId === req.params.id){
//       try{ 
//         //as user can have many posts we delete them
      
//         const user =await User.findById(req.params.id);
//     try{
//         //if we delete also here that user posts will to delete them also we add the above try block
//         await Post.deleteMany({username:user.username});
//         await User.findByIdAndDelete(req.params.id)
//      res.status(200).json("User has been deleted...");
//     }catch(err){
//         res.status(500).json(err);
//     }
// }catch(err){
//     res.status(404).json("User not found!");
// }
// }
// else{
//     res.status(401).json("You can delete only your account!");
// }
// });

// //DELETE POST






// // GET POST

// router.get("/:id", async(req,res)=>{
//     try{
//         const user = await User.findById(req.params.id);
//         // when we fetch an user we not supposed to seee the user password so
//         const {password, ...others}=user._doc;
//         res.status(200).json(others);
//     }
//     catch(err)
//     {
//         res.status(500).json(err)
//     }
// })

// module.exports=router

const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await Post.findByIdAndDelete(req.params.id);
      //  await post.delete();
        res.status(200).json("Post has been deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.delete("/:id", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (post.username === req.body.username) {
//       try {
//     // await  post.delete();
//         await post.findByIdAndDelete(req.params.id);
//         res.status(200).json("Post has been deleted...");
//       } catch (err) {
//         res.status(500).json(err);
//       }
//     } else {
//       res.status(401).json("You can delete only your post!");
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
//router.get("/?user="john", async (req, res) =>  to get alll posts of john
//router.get("/?cat="music", async (req, res) =>  to get alll posts of music category
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;