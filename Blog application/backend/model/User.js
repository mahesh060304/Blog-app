import mongoose from "mongoose";
let Schema=mongoose.Schema;
 const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        reqiured:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    blogs:[{
        type:mongoose.Types.ObjectId,ref:"Blog",required:true
    }],
 }

 )

 export default mongoose.model("User",userSchema);