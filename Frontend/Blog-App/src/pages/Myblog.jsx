// import React, { useEffect, useState } from "react";
// import { Card, CardContent, Typography, Button, Box } from "@mui/material";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";

// // const Myblog = () => {
// //   const [res, setres] = useState([]);
// //   const [selectedBlog, setSelectedBlog] = useState(null); // State to track the selected blog
// //   const id = localStorage.getItem("token");

// //   const getBlogs = async () => {
// //     if (!id) {
// //       toast.error("You are not logged in, please log in to view your blogs", {
// //         position: "top-right",
// //         autoClose: 5000,
// //       });
// //       return;
// //     }
// //     try {
// //       const response = await axios.get(`http://localhost:5000/blogs/${id}`);
// //       console.log(response.data); // Debug API response
// //       setres(response.data);
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   useEffect(() => {
// //     getBlogs();
// //   }, []); // Runs only once when the component mounts

// //   // Function to check if the current user is the author of the blog
// //   const isUserAuthor = (userId) => userId === id;

// //   const handleClick = (blog) => {
// //     setSelectedBlog(blog); // When a blog is clicked, set it as the selected blog
// //   };

// //   return (
// //     <div>
// //       {/* If a blog is selected, show only that blog, otherwise show all blogs */}
// //       {selectedBlog ? (
// //         <Card
// //           key={selectedBlog._id}
// //           sx={{
// //             width: "70%",
// //             margin: "25px auto",
// //             cursor: "pointer",
// //             display: "block",
// //           }}
// //         >
// //           <CardContent>
// //             <Typography variant="h6" component="div" gutterBottom>
// //               {selectedBlog.title}
// //             </Typography>
// //             <Typography variant="body2" color="text.secondary">
// //               <strong>Author:</strong> {selectedBlog.author}
// //             </Typography>
// //             <Typography
// //               variant="body2"
// //               color="text.secondary"
// //               sx={{
// //                 display: "-webkit-box",
// //                 WebkitBoxOrient: "vertical",
// //                 overflow: "hidden",
// //                 WebkitLineClamp: 3,
// //               }}
// //             >
// //               {selectedBlog.content}
// //             </Typography>
// //             <Typography variant="body2" color="text.secondary">
// //               <strong>Status:</strong> {selectedBlog.isPrivate ? "Private" : "Public"}
// //             </Typography>
// //             <Typography variant="body2" color="text.secondary">
// //               <strong>Created At:</strong> {new Date(selectedBlog.createdAt).toLocaleString()}
// //             </Typography>
// //             <Typography variant="body2" color="text.secondary">
// //               <strong>Updated At:</strong> {new Date(selectedBlog.updatedAt).toLocaleString()}
// //             </Typography>

// //             {/* Action Buttons: Update & Delete */}
// //             {isUserAuthor(selectedBlog.userId) && (
// //               <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
// //                 <Button variant="outlined" size="small">
// //                   Update
// //                 </Button>
// //                 <Button variant="outlined" color="error" size="small">
// //                   Delete
// //                 </Button>
// //               </Box>
// //             )}
// //           </CardContent>

// //           <ToastContainer
// //             position="top-left"
// //             autoClose={5000}
// //             hideProgressBar={false}
// //             newestOnTop={true}
// //             closeOnClick={true}
// //             rtl={false}
// //             pauseOnFocusLoss={false}
// //             pauseOnHover={true}
// //           />
// //         </Card>
// //       ) : (
// //         // If no blog is selected, show all blogs
// //         res.map((data) => (
// //           <Card
// //             key={data._id}
// //             sx={{
// //               width: "70%",
// //               margin: "25px auto",
// //               cursor: "pointer",
// //               display: "block",
// //             }}
// //             onClick={() => handleClick(data)} // On click, set selected blog
// //           >
// //             <CardContent>
// //               <Typography variant="h6" component="div" gutterBottom>
// //                 {data.title}
// //               </Typography>
// //               <Typography variant="body2" color="text.secondary">
// //                 <strong>Author:</strong> {data.author}
// //               </Typography>
// //               <Typography
// //                 variant="body2"
// //                 color="text.secondary"
// //                 sx={{
// //                   display: "-webkit-box",
// //                   WebkitBoxOrient: "vertical",
// //                   overflow: "hidden",
// //                   WebkitLineClamp: 3,
// //                 }}
// //               >
// //                 {data.content}
// //               </Typography>

// //               <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
// //                 <Button variant="outlined" size="small" to="/">
// //                   Update
// //                 </Button>
// //                 <Button variant="outlined" color="error" size="small">
// //                   Delete
// //                 </Button>
// //               </Box>
// //             </CardContent>
// //           </Card>
// //         ))
// //       )}
// //     </div>
// //   );
// // };

// // export default Myblog;

// import { useNavigate } from "react-router-dom"; // Import useNavigate

// const Myblog = () => {
//   const [res, setres] = useState([]);
//   const [selectedBlog, setSelectedBlog] = useState(null);
//   const id = localStorage.getItem("token");
//   const navigate = useNavigate(); // Initialize navigate

//   const getBlogs = async () => {
//     if (!id) {
//       toast.error("You are not logged in, please log in to view your blogs", {
//         position: "top-right",
//         autoClose: 5000,
//       });
//       return;
//     }
//     try {
//       const response = await axios.get(`http://localhost:5000/blogs/${id}`);
//       setres(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getBlogs();
//   }, []);

//   const isUserAuthor = (userId) => userId === id;

//   const handleClick = (blog) => {
//     setSelectedBlog(blog); // When a blog is clicked, set it as the selected blog
//   };

//   const handleUpdateClick = (blogId) => {
//     navigate(`/update-blog/${blogId}`); // Navigate to the update blog page
//   };

//   return (
//     <div>
//       {selectedBlog ? (
//         <Card
//           key={selectedBlog._id}
//           sx={{
//             width: "70%",
//             margin: "25px auto",
//             cursor: "pointer",
//             display: "block",
//           }}
//         >
//           <CardContent>
//             <Typography variant="h6" component="div" gutterBottom>
//               {selectedBlog.title}
//             </Typography>
//             {/* Other content like author, date, etc */}
            
//             {/* Action Buttons */}
//             {isUserAuthor(selectedBlog.userId) && (
//               <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
//                 <Button
//                   variant="outlined"
//                   size="small"
//                   onClick={() => handleUpdateClick(selectedBlog._id)} // Pass blog ID
//                 >
//                   Update
//                 </Button>
//                 {/* Delete button */}
//               </Box>
//             )}
//           </CardContent>
//         </Card>
//       ) : (
//         res.map((data) => (
//           <Card
//             key={data._id}
//             sx={{
//               width: "70%",
//               margin: "25px auto",
//               cursor: "pointer",
//               display: "block",
//             }}
//             onClick={() => handleClick(data)}
//           >
//             <CardContent>
//               <Typography variant="h6" component="div" gutterBottom>
//                 {data.title}
//               </Typography>
//               {/* Other content like author, content preview */}
              
//               <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
//                 <Button
//                   variant="outlined"
//                   size="small"
//                   onClick={() => handleUpdateClick(data._id)} // Pass blog ID
//                 >
//                   Update
//                 </Button>
//                 {/* Delete button */}
//               </Box>
//             </CardContent>
//           </Card>
//         ))
//       )}
//     </div>
//   );
// };


import React, { useEffect, useState } from "react"; 
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
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
      const response = await axios.get(`http://localhost:5000/blogs/${id}`);
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

  const handleUpdateClick = (blogId) => {
    // console.log(id)
    navigate(`/updateblog/${blogId}`); // Navigate to the update blog page
  };

  const handleDeleteClick = async (blogId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/deleteblogs/${blogId}`);
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
            {/* Other content like author, date, etc */}

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
            
            {/* Action Buttons */}
            {isUserAuthor(selectedBlog.userId) && (
              <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
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
              
              <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
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
