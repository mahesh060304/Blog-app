import User from "../model/User.js";
import bcrypt from 'bcryptjs';

export const getAllUser = async(req,res,next)=>{
    let users;
    try{
        users=await User.find();
    }catch(err){
        console.log(err);
    }
    if(!users){
        return res.status(404).json({message:"no users found"});
    }
    return res.status(200).json({users});
};

 export const signup= async(req,res)=>{
    let {name,email,password}=req.body;
    let existUser;
    try{
        existUser=await User.findOne({email});
    }catch(err){
        console.log(err);
    }
    if(existUser){
        return res.status(400).json({message:"Already signed up Instead Login!"})
    }
    const hashedPassword=bcrypt.hashSync(password);

    const user=new User({
        name,
        email,
        password:hashedPassword,
        blogs:[],
    })
    try{
       await user.save();
    }catch(err){
        console.log(err);
    }
    return res.status(200).json({user});
}

export const login=async (req,res)=>{
    const {email,password}=req.body;
    let existUser;
    try{
        existUser=await User.findOne({email:email})
    }catch(err){
        console.log(err);
    }
    if(!existUser){
        return res.status(400).json({message:"No user found by the email"});
    }
    const isPasswordCorrect=bcrypt.compareSync(password,existUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message:"Incorrect password"});
    }
    return res.status(200).json({message:"Login Successful" ,user:existUser});
}

