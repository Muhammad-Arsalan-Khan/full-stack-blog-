import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import BlogCard from "../component/BlogCard";
import checkToken from "../services/authService";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./Login";
import SignupPage from "./signup";
import Myblog from "./Myblog";
import CreateBlog from "./CreateBlog";
import UpdateBlog from "./UpdateBlog";
import AdminRoutes from "../routes/adminRoutes";
import AuthRoute from "../routes/AuthRoute";
import PrivateRoute from "../routes/privateRoutes";
import AdminDashboard from "./adminPage/AdminDashboard"
import AllUser from "./adminPage/AllUser"
import AllBlog from "./adminPage/AllBlog";

function Home() {
  const [authCheck, setAuthCheck] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const tokenStatus = checkToken();
    setAuthCheck(tokenStatus);
  }, []);

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar authCheck={authCheck} />}
      {/* <Navbar authCheck={authCheck} /> */}
      <Routes>
        <Route index element={<BlogCard />} />

        {/* private routes */}
        <Route element={<PrivateRoute authCheck={authCheck} />}>
          {/* <Navbar authCheck={authCheck} /> */}
          <Route path="/myblog" element={<Myblog />} />
          <Route path="/updateblog/:blogId" element={<UpdateBlog />} />
          <Route path="/createblog" element={<CreateBlog />} />
        </Route>

        {/* auth Routes */}
        <Route element={<AuthRoute />}>
          <Route path="/login" element={<LoginPage setAuthCheck={setAuthCheck}  />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        {/* admin */}
        <Route element={<AdminRoutes />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/allblog" element={< AllBlog />} />
          <Route path="/admin/alluser" element={< AllUser />} />
        </Route> 

      </Routes>
    </>
  );
}

export default Home;
