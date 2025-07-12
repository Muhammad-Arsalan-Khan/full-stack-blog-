import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function OTP() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [opt, setOpt] = useState("");

  const pageNavigate = () => {
    navigate(`/login`);
  };

  async function handleApproved() {
    console.log("OPT:", opt);
    try {
      const data = {
        optvalue: opt,
        isVerified: true,
      };
      const response = await axios.post(
        `http://localhost:5000/auth/opt/${id}`,
        data
      );
      const userdata = response.data;
      const { message, user } = userdata;
      console.log(message, user);
      toast.success(message, {
        position: "top-right",
        autoClose: 2000,
      });
      setTimeout(() => {
        pageNavigate();
      }, "3000");
    } catch (error) {
      if (error.message == "wrong OTP") {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 2500, 
        });
      }
      console.error("Error:", error, error.message, error.code);
    }
  }
  return (
    <>
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
          sx={{
            maxWidth: 400,
            width: "100%",
            padding: 3,
            borderRadius: "20px",
          }}
        >
          <CardContent>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
              BLOG OPT
            </Typography>

            {/* OPT Field */}
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              value={opt}
              onChange={(e) => setOpt(e.target.value)}
              fullWidth
              margin="normal"
            />

            {/* OPT Approved Button */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleApproved}
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Approved
            </Button>
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
    </>
  );
}

export default OTP;
