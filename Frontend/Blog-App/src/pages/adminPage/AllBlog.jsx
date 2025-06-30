import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";  
import { useNavigate } from "react-router-dom";  // Assuming you might want to navigate

const AllBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch blogs from API
  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/service/admin/allblogs", { withCredentials: true });
      setBlogs(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle delete blog
  const handleDelete = async (blogId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/service/deleteblogs/${blogId}`, { withCredentials: true });
      if (response.status === 200) {
        toast.success("Blog deleted successfully!", {
          position: "top-right",
          autoClose: 5000,
        });
        setBlogs(blogs.filter((blog) => blog._id !== blogId)); // Remove deleted blog from state
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete the blog.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const handleClick = (blog) => {
    setSelectedBlog(blog); // Set selected blog to display details
  };

  const handleBack = () => {
    setSelectedBlog(null); // Reset selected blog to show all blogs
  };

  if (loading) {
    return <Typography>Loading blogs...</Typography>;
  }

  return (
    <div>
      {selectedBlog ? (
        <>
          <Button variant="contained" color="primary" sx={{ marginLeft: "120px", marginTop: "5px" }} onClick={handleBack}>
            ← back
          </Button>

          <Card key={selectedBlog._id} sx={{ width: "70%", margin: "25px auto", cursor: "pointer", display: "block" }}>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                {selectedBlog.title}
              </Typography>

              {/* Image Display */}
              {selectedBlog.imageUrl && (
                <Box sx={{ textAlign: "center", marginBottom: 2 }}>
                  <img src={selectedBlog.imageUrl} alt="Blog" style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }} />
                </Box>
              )}

              <Typography variant="body2" color="text.secondary" sx={{ display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden", WebkitLineClamp: 3 }}>
                {selectedBlog.content}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                <strong>Status:</strong> {selectedBlog.isPrivate ? "Private" : "Public"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Created At:</strong> {new Date(selectedBlog.createdAt).toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Updated At:</strong> {new Date(selectedBlog.updatedAt).toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Likes:</strong> {selectedBlog.likesArray.length}
              </Typography>

              {/* Delete Button */}
              <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(selectedBlog._id)}>
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
        </>
      ) : (
        blogs.map((blog) => (
          <Card key={blog._id} sx={{ width: "70%", margin: "25px auto", cursor: "pointer", display: "block" }} onClick={() => handleClick(blog)}>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                {blog.title}
              </Typography>

              {/* Image Display */}
              {blog.imageUrl && (
                <Box sx={{ textAlign: "center", marginBottom: 2 }}>
                  <img src={blog.imageUrl} alt="Blog" style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }} />
                </Box>
              )}

              <Typography variant="body2" color="text.secondary" sx={{ display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden", WebkitLineClamp: 3 }}>
                {blog.content}
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                <Button variant="outlined" size="small" onClick={() => handleClick(blog)}>
                  View Details
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))
      )}

      <ToastContainer position="top-left" autoClose={5000} hideProgressBar={false} newestOnTop={true} closeOnClick={true} pauseOnFocusLoss={false} pauseOnHover={true} />
    </div>
  );
};

export default AllBlog;
