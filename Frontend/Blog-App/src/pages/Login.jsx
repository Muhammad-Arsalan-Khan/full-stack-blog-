import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Card,
  CardContent,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import checkToken from "../services/authService";
let id;

const LoginPage = ({ setAuthCheck }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const tokenStatus = checkToken();
    if (tokenStatus) {
      pageNavigate();
    }
  }, []);

  const pageNavigate = (id) => {
    //navigate('/');
    if (id == "68604c3ffd47cbd70c73b98b") {
      //68604c3ffd47cbd70c73b98b
      navigate("/admin");
      return;
    } else {
      navigate("/");
      return;
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    console.log("Email:", email);
    console.log("Password:", password);
    try {
      const data = {
        email: email,
        password: password,
      };
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        data,
        { withCredentials: true }
      );
      const userdata = response.data;
      const { message, user } = userdata;
      console.log(user.id, user.id.typeof);
      // console.log(message, token);
      id = user.id
      localStorage.setItem("token", user.id);
      // pageNavigate(user.id)
      setAuthCheck(true);
      // if ( user.id == "68604c3ffd47cbd70c73b98b" ){ //68604c3ffd47cbd70c73b98b
      //   navigate('/admin');
      //   return;
      // }
      toast.success(message, {
        position: "top-right",
        autoClose: 3000, // 5 seconds tak dikhaye
      });
      setTimeout(() => {
        pageNavigate(user.id);
      }, 4000);
    } catch (error) {
      console.error("Error:", error);
      if (
        error.message == "verify the email" &&
        error.response.status === 401
      ) {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate(`otp/${id}`);
        }, 3000);
        if (error.response && error.response.status === 400) {
          toast.error("Invalid Email & Password.", {
            position: "top-right",
            autoClose: 5000,
          });
        }
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
        padding: 3,
      }}
    >
      <Card
        sx={{ maxWidth: 400, width: "100%", padding: 3, borderRadius: "20px" }}
      >
        <CardContent>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Login
          </Typography>

          {/* Email Field */}
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={handleEmailChange}
            fullWidth
            margin="normal"
          />

          {/* Password Field with Show/Hide Text */}
          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    onClick={togglePasswordVisibility}
                    sx={{
                      textTransform: "none",
                      fontSize: "12px",
                      color: "gray",
                    }}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputAdornment>
              ),
            }}
          />

          {/* Login Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Login
          </Button>

          {/* Don't have an account link */}
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="body2" color="textSecondary" align="center">
              Don't have an account?{" "}
              <Link href="/signup" underline="hover" color="primary">
                Sign Up
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <ToastContainer
        position="top-left"
        autoClose={5000} // Auto-close after 5 seconds
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        pauseOnHover={true}
      />
    </Box>
  );
};

export default LoginPage;
