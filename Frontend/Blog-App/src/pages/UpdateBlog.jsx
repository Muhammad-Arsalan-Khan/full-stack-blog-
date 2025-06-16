import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // For accessing blogId in URL

const UpdateBlog = () => {
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    author: "",
    isPrivate: false,
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
    setBlog({
      ...blog,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/updateblogs/${blogId}`, blog);
      console.log("Updated blog:", response.data);
      navigate("/myblogs"); // Redirect to the blogs page
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
      <Box sx={{ marginTop: 2 }}>
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Update Blog
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateBlog;
