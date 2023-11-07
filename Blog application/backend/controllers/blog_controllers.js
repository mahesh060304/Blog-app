import Blog from "../model/Blog.js";
import User from "../model/User.js";
import mongoose from "mongoose";


export const getAllBlog = async(req,res,next)=>{
    let blogs;
    try{
        blogs=await Blog.find().populate("user");
    }catch(err){
        console.log(err);
    }
    if(!blogs){
        return res.status(404).json({message:"no blogs found"});
    }
    return res.status(200).json({blogs});
};

export const addBlog=async (req,res)=>{
    const {title,description,image,user}=req.body;
    let existingUser;
    try{
        existingUser=await User.findById(user);
    }catch(err){
        return console.log(err);
    }
    if(!existingUser){
        return res.status(400).json({message:"unable to find user by this id" })
    }
    let blogs=new Blog({
        title,
        description,
        image,
        user,
    });
    try{
        const session=await mongoose.startSession();
        session.startTransaction();
       await blogs.save({session});
       existingUser.blogs.push(blogs);
       await existingUser.save({session});
       await session.commitTransaction();    
    }catch(err){
        console.log(err);
        return res.status(500).json({message:err})
    }
    return res.status(200).json({blogs});
}


export const updateBlog=async (req,res)=>{
    const {title,description}=req.body;
    let blogid=req.params.id;
    let blogs;
   try{
    blogs=await Blog.findByIdAndUpdate(blogid,{
        title,
        description
    })
   }catch(err){
        return console.log(err);
   }
   if(!blogs){
        return res.status(500).json({message:"Unable to update the Blog"})
   }
   return res.status(200).json({message:"Updated Successfully"})
}

export const getBlogById=async (req,res)=>{
    let blogid=req.params.id;
    let Blogs;
    try{
        Blogs=await Blog.findById(blogid);
    }catch(err){
        return console.log(err);
    }
    if(!Blogs){
        return res.status(400).json("no Blogs found");
    }
    return res.status(200).json({Blogs})
}

export const deleteBlog=async(req,res)=>{
    let id=req.params.id;
    let blogs;
    try{
        blogs=await Blog.findByIdAndRemove(id).populate('user');
        await blogs.user.blogs.pull(blogs);
        await blogs.user.save();
    }catch(err){
        return console.log(err);
    }
    if(!blogs){
        return res.status(400).json({message:"No such blogs found"});
    }
   return res.status(200).json({message:"Deleted Successfully"});

}
export const getuserById=async(req,res)=>{
    let userid=req.params.id;
    let userBlogs;
    try{
        userBlogs=await User.findById(userid).populate("blogs");
    }catch(err){
        return console.log(err);
    }
    if(!userBlogs){
        return res.status(400).json({message:"Not Blogs found"});
    }
    return res.status(200).json({user:userBlogs});
}