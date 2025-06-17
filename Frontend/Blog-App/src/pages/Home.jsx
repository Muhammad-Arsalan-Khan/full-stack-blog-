import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import BlogCard from "../component/BlogCard";
import checkToken from "../services/authService";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Login";
import SignupPage from "./signup"
import Myblog from "./Myblog"
import CreateBlog from "./CreateBlog";
import UpdateBlog from "./UpdateBlog"

function Home() {
 const [authCheck, setAuthCheck] = useState(false);
  
 useEffect(() => {
    const tokenStatus = checkToken();  
    setAuthCheck(tokenStatus);  
  }, []); 

  return (
    <>
    {/* <Navbar authCheck={authCheck} />
    <BlogCard /> */}

        <Navbar authCheck={authCheck} />
      <Routes>
        <Route index element={<BlogCard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/myblog" element={<Myblog />} /> 
          <Route path="/updateblog/:blogId" element={<UpdateBlog />} />
        <Route path="/createblog" element={<CreateBlog />} /> 
      </Routes>
    </>
  );
}

export default Home;

