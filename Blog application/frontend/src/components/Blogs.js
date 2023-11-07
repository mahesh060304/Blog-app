import React, { useEffect,useState } from 'react';
import axios from "axios";
import Blog from '../components/Blog';
const Blogs=()=>{
  const [blogs,setBlogs]=useState();
  const sendRequest = async()=>{
    const res=await axios.get("http://localhost:4000/api/blog")
    .catch(err=>console.log(err));
    const data=await res.data;
    return data;
  }
  const Date=()=>{
    let date=new date();
    return date;
  }

  useEffect(()=>{
      sendRequest().then(data=>setBlogs(data.blogs));
  },[]);
  console.log(blogs);

  return (
    <div>
    {blogs && blogs.map((blog,index)=> <Blog title={
      blog.title} 
      description={blog.description}
      imageURL={blog.image}
      userName={blog.user.name}
      isUser={localStorage.getItem("userId")===blog.user._id}
      id={blog._id}
      date={Date}
      />)}
    </div>
  )
}



export default Blogs
