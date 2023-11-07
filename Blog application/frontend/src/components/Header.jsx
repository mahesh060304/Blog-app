import React, { useState} from "react";
import {AppBar,Toolbar,Typography,Box,Button,Tab,Tabs} from '@mui/material'
import  {Link} from 'react-router-dom';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../store";

const Header=()=>{
    const isLoggedIn=useSelector((state=>state.isLoggedIn))
    const dispatch=useDispatch();
    const [value,setValue]=useState();
    return (
    <AppBar position="sticky" sx={{background:"linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)"}}>
        <Toolbar>
            <Typography variant="h4" marginRight={"auto"}>Blog App</Typography>
            {!isLoggedIn &&
            <Tabs textColor="inherit" 
                value={value} 
                onChange ={(e,val)=>setValue(val)}>
                    <Tab LinkComponent={Link} to="/blogs" label="All Blogs"/>
                    {/* <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs"/> 
                    <Tab LinkComponent={Link} to="/blogs/add" label="Add Blogs"/>  */}

                </Tabs>
            }
           {isLoggedIn &&
                <Box display="flex" marginLeft={"auto"} marginRight={"auto"}>
                <Tabs textColor="inherit"
                value={value} 
                onChange ={(e,val)=>setValue(val)}>
                    <Tab LinkComponent={Link} to="/blogs" label="All Blogs"/>
                    <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs"/> 
                    <Tab LinkComponent={Link} to="/blogs/add" label="Add Blogs"/> 

                </Tabs>
            </Box>

           } 
            <Box display="flex" marginLeft="auto">
                {!isLoggedIn &&<>
                <Button 
                LinkComponent={Link} to="/auth"
                variant="contained" 
                sx={{margin:1,borderRadius:10}} 
                color="warning">
                   LOGIN
                    
            </Button>
            <Button 
                LinkComponent={Link} to="/auth"
                variant="contained"  
                sx={{margin:1,borderRadius:10}} 
                color="warning">
                    SIGNUP
            </Button></>}
               {isLoggedIn &&
                <Button 
                onClick={()=>dispatch(authActions.logout())}
                LinkComponent={Link} to="/auth"
                variant="contained"  
                sx={{margin:1,borderRadius:10}} 
                color="warning">
                    LOGOUT
            </Button>}
            </Box>
        </Toolbar>
    </AppBar>
    

)};
export default Header;