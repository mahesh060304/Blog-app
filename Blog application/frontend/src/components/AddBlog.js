import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const AddBlog = () => {
  const [inputs,setInputs]=useState({
    title:"",
    description:"",
    imageURL:"",
});
const handleChange=(e)=>{
  setInputs((prevState)=>({
    ...prevState,
    [e.target.name]:e.target.value,
}));
};
const sendRequest=async()=>{

  let res=await axios.post(`http://localhost:4000/api/blog/add`,{
      title:inputs.title,
      description:inputs.description,
      image:inputs.imageURL,
      user:localStorage.getItem("userId"),
  }).catch((err)=>console.log(err));

console.log(res);
const data=await res.data;
return data;
} 
const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(data=>console.log(data));
}

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box border={3} borderColor='green' borderRadius={10} boxShadow="10px 10px 20px #ccc" padding={3} margin={3} marginTop={3} display={'flex'} flexDirection={'column'} width={"50%"} displayPrint={'flex'} justifyContent={'center'}>
          <Typography fontWeight={"bold"} padding={3} color="black" variant="h2" textAlign={'center'}>Post Your Blog</Typography>
          <InputLabel sx={{mb:1,mt:2,fontSize:'24px',fontWeight:'bold'}} >Title</InputLabel>
          <TextField value={inputs.value} name="title" onChange={handleChange} margin="normal" variant="outlined"/>
          <InputLabel sx={{mb:1,mt:2,fontSize:'24px',fontWeight:'bold'}}>Description</InputLabel>
          <TextField value={inputs.value} name="description" onChange={handleChange} margin="normal" variant="outlined"/>    
          <InputLabel sx={{mb:1,mt:2,fontSize:'24px',fontWeight:'bold'}}>Image URL</InputLabel>
          <TextField value={inputs.value} name="imageURL" onChange={handleChange} margin="normal" variant="outlined"/>
          <Button sx={{mb:1,mt:2}} variant='contained' type="submit">SUBMIT</Button>

        </Box>
      </form>
    </div>
  )
}

export default AddBlog;
