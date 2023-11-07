import express from "express";
import { getAllBlog,addBlog,updateBlog,getBlogById,deleteBlog,getuserById } from "../controllers/blog_controllers.js";
const Blogrouter=express.Router();

Blogrouter.get("/",getAllBlog);
Blogrouter.post("/add",addBlog);
Blogrouter.put("/update/:id",updateBlog);
Blogrouter.get("/get/:id",getBlogById);
Blogrouter.delete("/delete/:id",deleteBlog);
Blogrouter.get("/user/:id",getuserById);



export default Blogrouter;