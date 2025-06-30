// import React, { useState } from "react";
// import {
//   TextField,
//   Button,
//   Box,
//   Typography,
//   FormControlLabel,
//   Checkbox,
//   Card,
//   CardContent,
// } from "@mui/material";
// import { ToastContainer, toast } from "react-toastify";
// import { useNavigate } from "react-router-dom"; 
// import axios from "axios";

// const CreateBlog = () => {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [author, setAuthor] = useState(""); // New state for author name
//   const [isPrivate, setIsPrivate] = useState(false);
//   const userId = localStorage.getItem("token");

//   const navigate = useNavigate();



//   const handleTitleChange = (e) => {
//     setTitle(e.target.value);
//   };

//   const handleContentChange = (e) => {
//     setContent(e.target.value);
//   };

//   const handleAuthorChange = (e) => {
//     setAuthor(e.target.value); // Author name field
//   };

//   const handleCheckboxChange = (e) => {
//     setIsPrivate(e.target.checked);
//   };

//   const handleSave = async () => {
//     // Validations
//     if (!title || !content || !author) {
//       toast.error("Title, Content, and Author Name are required", {
//         position: "top-right",
//         autoClose: 5000,
//       });
//       return;
//     }

//     const WriteBlog = {
//       userId: userId, // Assuming token holds userId
//       title: title,
//       content: content,
//       author: author,
//       isPrivate: isPrivate,
//       imageUrl: "",
//       likesArray : [],
//     };
//     console.log(WriteBlog);
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/service/createblogs",
//         WriteBlog,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         },{ withCredentials: true }
//       );
//       if (response.status === 201) {
//         toast.success("Blog created successfully!", {
//           position: "top-right",
//           autoClose: 3000,
//         });
//         setTitle(""); // Clear the fields
//         setContent("");
//         setAuthor(""); // Clear author name
//         setIsPrivate(false);
//       }
//       setTimeout(() => {
//         navigate("/myblog");
//       }, 4000);
//     } catch (error) {
//       console.log(error, error.message, error.code);
//       toast.error("Error creating blog, please try again.", {
//         position: "top-right",
//         autoClose: 5000,
//       });
//     }
//   };

//   return (
//     <Box sx={{ width: "80%", maxWidth: 600, margin: "40px auto" }}>
//       <Card>
//         <CardContent>
//           <Typography variant="h5" gutterBottom>
//             Create a New Blog
//           </Typography>

//           {/* Title Input Field */}
//           <TextField
//             label="Title"
//             variant="outlined"
//             fullWidth
//             sx={{ marginBottom: 2 }}
//             value={title}
//             onChange={handleTitleChange}
//           />

//           {/* Author Input Field */}
//           <TextField
//             label="Author Name"
//             variant="outlined"
//             fullWidth
//             sx={{ marginBottom: 2 }}
//             value={author}
//             onChange={handleAuthorChange} // Bind author name
//           />

//           {/* Content Input Field */}
//           <TextField
//             label="Content"
//             variant="outlined"
//             fullWidth
//             multiline
//             rows={6}
//             sx={{ marginBottom: 2 }}
//             value={content}
//             onChange={handleContentChange}
//           />

//           {/* Privacy Checkboxes */}
//           <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   checked={isPrivate}
//                   onChange={handleCheckboxChange}
//                   color="primary"
//                 />
//               }
//               label="Private"
//             />
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   checked={!isPrivate}
//                   onChange={handleCheckboxChange}
//                   color="primary"
//                 />
//               }
//               label="Public"
//             />
//           </Box>

    
//           {/* Save Button */}
//           <Button
//             variant="contained"
//             color="primary"
//             fullWidth
//             onClick={handleSave}
//             sx={{ padding: "10px" }}
//           >
//             Save Blog
//           </Button>
//         </CardContent>
//       </Card>

//       {/* Toast Notifications */}
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={true}
//         closeOnClick={true}
//         rtl={false}
//         pauseOnFocusLoss={false}
//         pauseOnHover={true}
//       />
//     </Box>
//   );
// };

// export default CreateBlog;
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
import { useNavigate } from "react-router-dom"; 
import axios from "axios";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [image, setImage] = useState(null); // New state to store image
  const userId = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleAuthorChange = (e) => setAuthor(e.target.value);
  const handleCheckboxChange = (e) => setIsPrivate(e.target.checked);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadToCloudinary(file);
    }
  };

  const uploadToCloudinary = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "blog-upload-preset"); // Using the preset name here

    // Cloudinary image upload API
    axios.post('https://api.cloudinary.com/v1_1/dngxl5clb/image/upload', formData)
      .then((result) => {
        setImage(result.data.secure_url); // Set the image URL once uploaded
        toast.success("Image uploaded successfully!", { position: "top-right" });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Image upload failed. Please try again.", { position: "top-right" });
      });
  };

  const handleSave = async () => {
    if (!title || !content || !author) {
      toast.error("Title, Content, and Author Name are required", { position: "top-right", autoClose: 5000 });
      return;
    }

    const WriteBlog = {
      userId: userId,
      title: title,
      content: content,
      author: author,
      isPrivate: isPrivate,
      imageUrl: image || "",  // Save image URL here
      likesArray: [],
      blogView: "",
      isActive: true,
    };

    try {
      // const response = await axios.post("http://localhost:5000/service/createblogs", WriteBlog, {
      //   headers: { "Content-Type": "application/json" },
      // } ,{ withCredentials: true });
      const response = await axios.post(
        "http://localhost:5000/service/createblogs",
        WriteBlog,
         {withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      if (response.status === 201) {
        toast.success("Blog created successfully!", { position: "top-right", autoClose: 3000 });
        setTitle("");
        setContent("");
        setAuthor("");
        setIsPrivate(false);
        setImage(null);  // Reset the image after successful save
      }
      setTimeout(() => navigate("/myblog"), 4000);
    } catch (error) {
      console.log(error);
      console.log(error.message);
      console.log(error);
      toast.error("Error creating blog, please try again.", { position: "top-right", autoClose: 5000 });
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
            onChange={handleAuthorChange}
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
              control={<Checkbox checked={isPrivate} onChange={handleCheckboxChange} color="primary" />}
              label="Private"
            />
            <FormControlLabel
              control={<Checkbox checked={!isPrivate} onChange={handleCheckboxChange} color="primary" />}
              label="Public"
            />
          </Box>

          {/* Image Upload Button */}
          <Button variant="contained" color="secondary" fullWidth sx={{ marginBottom: 2 }} component="label">
            Upload Image
            <input type="file" hidden onChange={handleImageChange} />
          </Button>

          {/* Image Preview */}
          {image && <img src={image} alt="Uploaded" style={{ width: "100%", marginBottom: "20px" }} />}

          {/* Save Button */}
          <Button variant="contained" color="primary" fullWidth onClick={handleSave}>
            Save Blog
          </Button>
        </CardContent>
      </Card>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={true} closeOnClick={true} />
    </Box>
  );
};

export default CreateBlog;
