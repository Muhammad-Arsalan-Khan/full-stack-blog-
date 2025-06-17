import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Typography, FormControlLabel, Checkbox } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; 
import { ToastContainer, toast } from "react-toastify";

const UpdateBlog = () => {
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    author: "",
    isPrivate: false, // Default to false (public) until fetched
  });

  const { blogId } = useParams(); // Get blogId from URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/blog/${blogId}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [blogId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle the checkbox value for privacy
    if (type === "checkbox") {
      setBlog({
        ...blog,
        id: blogId,
        [name]: checked,
      });
    } else {
      setBlog({
        ...blog,
        id: blogId,
        [name]: value,
      });
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`http://localhost:5000/updateblogs/${blogId}`, blog);
      console.log("Updated blog:", response.data);
      toast.success("Blog Update successfully!", {
                position: "top-right",
                autoClose: 3000,
              });
      setTimeout(() => {
        navigate("/myblog");
      }, 4000);
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <Box sx={{ width: "60%", margin: "50px auto" }}>
      <Typography variant="h4" gutterBottom>
        Update Blog
      </Typography>

      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        margin="normal"
        name="title"
        value={blog.title}
        onChange={handleChange}
      />
      <TextField
        label="Content"
        variant="outlined"
        fullWidth
        margin="normal"
        name="content"
        multiline
        rows={6}
        value={blog.content}
        onChange={handleChange}
      />
      <TextField
        label="Author"
        variant="outlined"
        fullWidth
        margin="normal"
        name="author"
        value={blog.author}
        onChange={handleChange}
      />

      {/* Privacy Checkbox - "Private" or "Public" */}
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={blog.isPrivate} // Use blog.isPrivate to set checkbox state
              onChange={handleChange}
              name="isPrivate" // Ensure name matches the state
              color="primary"
            />
          }
          label="Private"
        />
      </Box>

      <Box sx={{ marginTop: 2 }}>
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Update Blog
        </Button>
      </Box>
      <ToastContainer
              position="top-right"
              autoClose={5000}
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

export default UpdateBlog;
