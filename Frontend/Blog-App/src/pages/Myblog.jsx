import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Myblog = () => {
  const [res, setres] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const id = localStorage.getItem("token");
  const navigate = useNavigate(); // Initialize navigate

  const getBlogs = async () => {
    if (!id) {
      toast.error("You are not logged in, please log in to view your blogs", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:5000/service/blogs/${id}`,
        { withCredentials: true }
      );
      setres(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const isUserAuthor = (userId) => userId === id;

  const handleClick = (blog) => {
    setSelectedBlog(blog); // When a blog is clicked, set it as the selected blog
  };
  const handleUiCard = () => {
    setSelectedBlog(null); // Reset selected blog to show all blogs
  };

  const handleUpdateClick = (blogId) => {
    // console.log(id)
    navigate(`/updateblog/${blogId}`); // Navigate to the update blog page
  };

  const handleDeleteClick = async (blogId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/service/deleteblogs/${blogId}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Blog deleted successfully!", {
          position: "top-right",
          autoClose: 5000,
        });
        // Update the list of blogs after deleting one
        setres(res.filter((blog) => blog._id !== blogId));
      }
    } catch (error) {
      toast.error("Failed to delete the blog.", {
        position: "top-right",
        autoClose: 5000,
      });
      console.log("Error deleting blog:", error);
    }
  };

  return (
    <div>
      {selectedBlog ? (
        <>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginLeft: "120px", marginTop: "5px" }}
            onClick={handleUiCard}
          >
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
              <Typography variant="h6" component="div" gutterBottom>
                {selectedBlog.title}
              </Typography>

              {/* Image Display */}
              {selectedBlog.imageUrl && (
                <Box sx={{ textAlign: "center", marginBottom: 2 }}>
                  <img
                    src={selectedBlog.imageUrl}
                    alt="Blog"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      borderRadius: "8px",
                    }}
                  />
                </Box>
              )}

              {/* <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  WebkitLineClamp: 3,
                }}
              >
                {selectedBlog.content}
              </Typography> */}
              <Typography variant="body2" color="text.secondary">
                {selectedBlog.content}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                <strong>Status:</strong>{" "}
                {selectedBlog.isPrivate ? "Private" : "Public"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Created At:</strong>{" "}
                {new Date(selectedBlog.createdAt).toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Updated At:</strong>{" "}
                {new Date(selectedBlog.updatedAt).toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Likes</strong>{" "}
                {selectedBlog.likesArray.length.toLocaleString()}
              </Typography>

              {/* Action Buttons */}
              {isUserAuthor(selectedBlog.userId) && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 2,
                  }}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleUpdateClick(selectedBlog._id)} // Pass blog ID
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDeleteClick(selectedBlog._id)} // Delete the selected blog
                  >
                    Delete
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
          <Card
            key={selectedBlog._id + selectedBlog.commitArray.length}
            sx={{
              width: "70%",
              margin: "25px auto",
              cursor: "pointer",
              display: "block",
            }}
          >
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                Total Comments :{" "}
                {selectedBlog.commitArray ? selectedBlog.commitArray.length : 0}
              </Typography>
              {selectedBlog.commitArray && (
                <List>
                  {selectedBlog.commitArray.map((commit) => (
                    <div key={commit.commitWriter}>
                      <ListItem>
                        <ListItemText
                          // primary={<strong>{commit.commitWriter}</strong>}
                          secondary={commit.commitMessage}
                        />
                      </ListItem>
                      <Divider />
                    </div>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </>
      ) : (
        res.map((data) => (
          <Card
            key={data._id}
            sx={{
              width: "70%",
              margin: "25px auto",
              cursor: "pointer",
              display: "block",
            }}
            onClick={() => handleClick(data)}
          >
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                {data.title}
              </Typography>
              {/* Other content like author, content preview */}
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  WebkitLineClamp: 3,
                }}
              >
                {data.content}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 2,
                }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleUpdateClick(data._id)} // Pass blog ID
                >
                  Update
                </Button>
                {isUserAuthor(data.userId) && (
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDeleteClick(data._id)} // Delete the blog
                  >
                    Delete
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        ))
      )}

      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        pauseOnHover={true}
      />
    </div>
  );
};

export default Myblog;
