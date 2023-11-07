import React, { useState } from "react";
import {Box,TextField,Typography,Button} from "@mui/material";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store";


const Auth=()=>{
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [inputs,setInputs]=useState({
        name:"",
        email:"",
        password:"",
    });

     const [isSignup,setsignup]=useState(false);
     const handleChange=(e)=>{
        setInputs((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value,
        }));
     };
     const sendRequest=async(type="login")=>{

            let res=await axios.post(`http://localhost:4000/api/user/${type}`,{
                name:inputs.name,
                email:inputs.email,
                password:inputs.password,
            }).catch((err)=>console.log(err));
        
        console.log(res);
        const data=await res.data;
        return data;
     } 




     const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(inputs);
        if(isSignup){
            sendRequest("signup").then((data)=>localStorage.setItem("userId",data.user._id))
            .then(()=>dispatch(authActions.login())).then(()=>navigate("/blogs"))
            .then(data=>console.log(data));
        }else{
            sendRequest().then((data)=>localStorage.setItem("userId",data.user._id))
            .then(()=>dispatch(authActions.login())).then(()=>navigate("/blogs"))
            .then(data=>console.log(data));
        }
        

     }
    return (
    <div>
        <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection={"column"} alignItems={"center"} justifyContent={"center"} 
            boxShadow={"10px 10px 20px #ccc"} padding={3} margin={"auto"}
            marginTop={5} borderRadius={5}>
                <Typography variant="h2" padding={3} textAlign={"center"}>
                {
                    isSignup ? "SIGNUP":"LOGIN"
                }
                </Typography>
                {isSignup && 
                     <TextField name="name" onChange={handleChange} value={inputs.name} placeholder="USERNAME" margin="normal" required/>

                }{""}
               
                <TextField name="email" onChange={handleChange}
                    value={inputs.email}
                    type={"email"}
                    placeholder="EMAIL" 
                    margin="normal"
                    required
                />
                <TextField 
                    name="password" onChange={handleChange}
                    value={inputs.password}
                    type={"password"} 
                    placeholder="PASSWORD" 
                    margin="normal"
                    required
                />

                <Button type="submit" 
                    variant="contained" 
                    sx={{borderRadius:3,marginTop:3}} 
                    color="warning">
                        Submit
                </Button>

                <Button onClick={()=>setsignup(!isSignup)} sx={{borderRadius:3,marginTop:3}} >Change to {isSignup?"Login":"SignUp"}</Button>

            </Box>
        </form>

    </div>
    
)}
export default Auth;