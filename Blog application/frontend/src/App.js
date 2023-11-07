import './App.css';
import React from 'react';
import {useSelector} from 'react-redux';
import Header from './components/Header';
import {Route,Routes} from "react-router-dom";
import Auth from './components/Auth';
import Blogs from './components/Blogs';
import UserBlogs from './components/UserBlogs';
import BlogDetails from './components/BlogDetails';
import AddBlog from './components/AddBlog';

function App() {
  const isLoggedIn=useSelector((state=>state.isLoggedIn))
  console.log(isLoggedIn);
  return (
    <React.Fragment>
      <header>
          <Header/>
      </header>
      {/* <BrowserRouter> */}
      <main>
        <Routes>
          <Route path="/auth" element={<Auth/>}/> 
          <Route path="/blogs" element={<Blogs/>}/>
          <Route path="/myBlogs" element={<UserBlogs/>}/>
          <Route path="/myBlogs/:id" element={<BlogDetails/>}/> 
          <Route path="/blogs/add" element={<AddBlog/>}/> 
        </Routes>
      </main>
      {/* </BrowserRouter> */}

    </React.Fragment>
   
  );
}

export default App;
