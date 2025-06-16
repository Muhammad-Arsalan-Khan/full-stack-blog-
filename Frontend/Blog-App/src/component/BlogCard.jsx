import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import axios from "axios";

const BlogCard = () => {
  const [res, setRes] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null); // State to track selected blog
  const id = localStorage.getItem("token"); // Get userId from localStorage

  const getBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/blogs");
      console.log(response.data); // Debug API response
      setRes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []); // Runs only once when the component mounts

  // Function to check if the current user is the author of the blog
  // const isUserAuthor = (userId) => userId === id;

  const handleClick = (blog) => {
    setSelectedBlog(blog); // Set the clicked blog as the selected one
  };

  return (
    <div>
      {/* If a blog is selected, show only that blog, otherwise show all blogs */}
      {selectedBlog ? (
        <Card
          key={selectedBlog._id}
          sx={{
            width: "70%",
            margin: "25px auto",
            cursor: "pointer",
            display: "block",
          }}
        >
          <CardContent>
            {/* Blog Title */}
            <Typography variant="h6" component="div" gutterBottom>
              {selectedBlog.title}
            </Typography>

            {/* Blog Author */}
            <Typography variant="body2" color="text.secondary">
              <strong>Author:</strong> {selectedBlog.author}
            </Typography>

            {/* Blog Content (Showing the full content) */}
            <Typography variant="body2" color="text.secondary">
              {selectedBlog.content}
            </Typography>

            {/* Blog Status (Public/Private) */}
            <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
              <strong>Status:</strong> {selectedBlog.isPrivate ? "Private" : "Public"}
            </Typography>

            {/* Blog Created and Updated Dates */}
            <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
              <strong>Created At:</strong> {new Date(selectedBlog.createdAt).toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
              <strong>Updated At:</strong> {new Date(selectedBlog.updatedAt).toLocaleString()}
            </Typography>

            {/* Action Buttons: Update & Delete */}
            {/* {isUserAuthor(selectedBlog.userId) && ( // Show buttons only if the current user is the author
              <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                <Button variant="outlined" size="small">
                  Update
                </Button>
                <Button variant="outlined" color="error" size="small">
                  Delete
                </Button>
              </Box>
            )} */}
          </CardContent>
        </Card>
      ) : (
        // If no blog is selected, show all blogs
        res.map((data) => (
          <Card
            key={data._id}
            sx={{
              width: "70%",
              margin: "25px auto",
              cursor: "pointer",
              display: "block",
            }}
            onClick={() => handleClick(data)} // On click, set selected blog
          >
            <CardContent>
              {/* Blog Title */}
              <Typography variant="h6" component="div" gutterBottom>
                {data.title}
              </Typography>

              {/* Blog Author */}
              <Typography variant="body2" color="text.secondary">
                <strong>Author:</strong> {data.author}
              </Typography>

              {/* Blog Content (Showing only part of it) */}
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  WebkitLineClamp: 3, // Limits content to 3 lines
                }}
              >
                {data.content}
              </Typography>

              {/* Blog Status (Public/Private) */}
              <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                <strong>Status:</strong> {data.isPrivate ? "Private" : "Public"}
              </Typography>

              {/* Blog Created and Updated Dates */}
              {/* <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                <strong>Created At:</strong> {new Date(data.createdAt).toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                <strong>Updated At:</strong> {new Date(data.updatedAt).toLocaleString()}
              </Typography> */}

              {/* Action Buttons: Update & Delete */}
              {/* {isUserAuthor(data.userId) && ( // Show buttons only if the current user is the author
                <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                  <Button variant="outlined" size="small">
                    Update
                  </Button>
                  <Button variant="outlined" color="error" size="small">
                    Delete
                  </Button>
                </Box>
              )} */}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default BlogCard;

