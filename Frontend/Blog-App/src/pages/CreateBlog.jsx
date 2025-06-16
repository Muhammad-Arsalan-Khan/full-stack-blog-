import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Card,
  CardContent,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState(""); // New state for author name
  const [isPrivate, setIsPrivate] = useState(false);
  const userId = localStorage.getItem("token");
  //   console.log(userId)

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value); // Author name field
  };

  const handleCheckboxChange = (e) => {
    setIsPrivate(e.target.checked);
  };

  const handleSave = async () => {
    // Validations
    if (!title || !content || !author || isPrivate === undefined) {
      toast.error("Title, Content, and Author Name are required", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    const WriteBlog = {
      userId: userId, // Assuming token holds userId
      title: title,
      content: content,
      author: author,
      isPrivate: isPrivate,
      imageUrl: "",
    };
    console.log(WriteBlog);
    try {
      const response = await axios.post(
        "http://localhost:5000/createblogs",
        WriteBlog,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        toast.success("Blog created successfully!", {
          position: "top-right",
          autoClose: 5000,
        });
        setTitle(""); // Clear the fields
        setContent("");
        setAuthor(""); // Clear author name
        setIsPrivate(false);
      }
    } catch (error) {
      console.log(error, error.message, error.code);
      toast.error("Error creating blog, please try again.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <Box sx={{ width: "80%", maxWidth: 600, margin: "40px auto" }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Create a New Blog
          </Typography>

          {/* Title Input Field */}
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
            value={title}
            onChange={handleTitleChange}
          />

          {/* Author Input Field */}
          <TextField
            label="Author Name"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
            value={author}
            onChange={handleAuthorChange} // Bind author name
          />

          {/* Content Input Field */}
          <TextField
            label="Content"
            variant="outlined"
            fullWidth
            multiline
            rows={6}
            sx={{ marginBottom: 2 }}
            value={content}
            onChange={handleContentChange}
          />

          {/* Privacy Checkboxes */}
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isPrivate}
                  onChange={handleCheckboxChange}
                  color="primary"
                />
              }
              label="Private"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={!isPrivate}
                  onChange={handleCheckboxChange}
                  color="primary"
                />
              }
              label="Public"
            />
          </Box>

          {/* Save Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSave}
            sx={{ padding: "10px" }}
          >
            Save Blog
          </Button>
        </CardContent>
      </Card>

      {/* Toast Notifications */}
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

export default CreateBlog;
