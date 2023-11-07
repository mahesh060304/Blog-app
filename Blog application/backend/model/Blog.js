import mongoose from 'mongoose'

let Schema=mongoose.Schema;
 const BlogSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        reqiured:true,
        unique:true
    },
    image:{
        type:String,
        required:true
    },
    user: {
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    }
 })

 export default mongoose.model("Blog",BlogSchema);