import express from "express";
import mongoose from "mongoose";
import router from "./routes/user_route.js"
import Blogrouter from "./routes/blog_route.js";
import cors from 'cors';
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors(
    {origin: ["http://localhost:3000"]}
));
app.use("/api/user",router);
app.use("/api/blog",Blogrouter); 



mongoose.connect('mongodb+srv://admin:mahesh2004@cluster0.b5pfm1n.mongodb.net/?retryWrites=true&w=majority').then(()=>app.listen(4000)).then(()=>console.log('Connected to db and listening at 5000')).catch((err)=>console.log(err));


// app.listen(4000,()=>{
//     console.log("listening at 4000")
// })
































// --experimental-modules --es-module-specifier-resolution=node