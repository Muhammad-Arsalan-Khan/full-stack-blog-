import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BlogCard = () => {
  const [res, setRes] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null); // State to track selected blog
  const [likeCount, setLikeCount] = useState(0);
  const [likeCheck, setlikeCheck] = useState(false);
  const id = localStorage.getItem("token"); // Get userId from localStorage
  const navigate = useNavigate();
  const [likeId, setLikeId] = useState("");

  const getBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/blogs", {
        withCredentials: true,
      });
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
    if (!id) {
      navigate("/login");
    }
    setSelectedBlog(blog); // Set the clicked blog as the selected one
    setLikeCount(blog.likesArray.length); // Set the like count from the selected blog
  };
  const handleUiCard = () => {
    setSelectedBlog(null); // Reset selected blog to show all blogs
  }

  const handleLike = async (selectedBlog) => {
    setlikeCheck(!likeCheck); // ui Toggle like state
    setLikeCount(likeCount + (likeCheck ? -1 : 1)); // Update like count based on current state
    setLikeId(selectedBlog._id);
    try {
      const likeResponse = await axios.patch(
        `http://localhost:5000/service/likeblogs/${selectedBlog._id}`,
        {
          likes: id, // Assuming `id` is the user ID you want to associate with the like
        },
        { withCredentials: true }
      );
      console.log("Like response:", likeResponse.data);
    } catch (error) {
      console.error("Error updating like count:", error);
    }
  };

  return (
    <div>
      {/* If a blog is selected, show only that blog, otherwise show all blogs */}
      {selectedBlog ? (
        <>
      <Button variant="contained" color="primary" sx={{marginLeft:"120px", marginTop:"5px"}} onClick={handleUiCard} >
        ← back
      </Button>
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
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ marginTop: 1 }}
            >
              <strong>Status:</strong>{" "}
              {selectedBlog.isPrivate ? "Private" : "Public"}
            </Typography>

            {/* Blog Created and Updated Dates */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ marginTop: 1 }}
            >
              <strong>Created At:</strong>{" "}
              {new Date(selectedBlog.createdAt).toLocaleString()}
            </Typography>
            {/* <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
              <strong>Updated At:🖤</strong> {new Date(selectedBlog.updatedAt).toLocaleString()}
            </Typography> */}
            <Typography
              variant="h4"
              color="text.secondary"
              sx={{ marginTop: 1 }}
              onClick={() => handleLike(selectedBlog)}
            >
              {selectedBlog.likesArray.includes(id)
                ? "💖"
                : likeCheck
                ? "💖"
                : "🖤"}
              <Typography variant="body2" marginLeft={2.4}>
                {likeCount}
              </Typography>
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
        </>
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
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ marginTop: 1 }}
              >
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
