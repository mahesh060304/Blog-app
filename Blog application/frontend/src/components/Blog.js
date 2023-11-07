import React from 'react'
import { Avatar,Card,CardContent,CardHeader,CardMedia,IconButton,Typography,Box } from '@mui/material'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
// import { useStyles } from "./utils";
import axios from 'axios';


const Blog = ({title,description,imageURL,userName,isUser,id,date}) => {

  // const classes = useStyles();
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };
  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:4000/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate("/"))
      .then(() => navigate("/blogs"));
  };
  var today = new Date(),
  date = today.getDate() + ' / ' + (today.getMonth() + 1) + ' / ' + today.getFullYear();

  return (
    <div>
        {" "}
         <Card sx={{maxWidth: "60%",margin:'auto',mt:10,padding:2,boxShadow:"5px 5px 10px #ccc",":hover:":{
            boxShadow:"10px 10px 20px #ccc"
         } }} >

        {isUser &&(
          <Box display="flex">
            <IconButton onClick={handleEdit} sx={{marginLeft:"auto"}}>
              <ModeEditOutlineIcon color="warning"/>
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon/>
            </IconButton>
          </Box>
         )}



      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red"}} aria-label="recipe">
            {userName.charAt(0)}
          </Avatar>
        }
      
        title={title}
        subheader={date}
      />

      <CardMedia
        component="img"
        height="450"
        image={imageURL}
        alt="Blog image"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        <b> {userName}</b>{" : "}{description}
        </Typography>
      </CardContent>
     
    </Card>
      
    </div>
  
  )
}

export default Blog
