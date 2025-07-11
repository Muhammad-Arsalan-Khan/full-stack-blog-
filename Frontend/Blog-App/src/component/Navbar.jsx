// import React from "react";
// import { AppBar, Toolbar, Button, Typography, Box, TextField } from "@mui/material";
// import { Link } from "react-router-dom";

// const Navbar = ({ authCheck }) => {
//   // const [inputValue, setinput] = useState("");
//   // const [searchTerm, setSearchTerm] = useState("");
//   // const handleSearchChange = (e) => {
//   //   setSearchTerm(e.target.value);
//   // };

//   return (
//     <AppBar position="sticky">
//       <Toolbar
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           backgroundColor: "black",
//           padding: "25px",
//         }}
//       >
//         {/* Left Side - MYBLOG */}
//         <Typography variant="h5" fontWeight={700}>
//           MY BLOG
//         </Typography>

//         {/* {authCheck && (
//           <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
//             <TextField
//               value={searchTerm}
//               onChange={handleSearchChange}
//               label="Search"
//               variant="outlined"
//               size="small"
//               sx={{ marginRight: 2, backgroundColor: "white", borderRadius: "5px" }}
//             />
//           </Box>
//         )} */}

//         {/* Right Side - Conditional Buttons */}
//         <Box>
//           {authCheck ? (
//             // If authCheck is true, show Home, MyBlog, and Create Blog
//             <>
//               {/* <TextField
//               value={searchTerm}
//               onChange={handleSearchChange}
//               label="Search"
//               variant="outlined"
//               size="small"
//               sx={{ marginRight: 2, backgroundColor: "white", borderRadius: "5px" }}
//             /> */}
//               <Button color="inherit" component={Link} to="/">
//                 Home
//               </Button>
//               <Button color="inherit" component={Link} to="/myblog">
//                 MyBlog
//               </Button>
//               <Button color="inherit" component={Link} to="/createblog">
//                 Create Blog
//               </Button>
//             </>
//           ) : (
//             // If authCheck is false, show Login button
//             <Button color="inherit" component={Link} to="/login">
//               Login
//             </Button>
//           )}
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { AppBar, Toolbar, Button, Typography, Box, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = ({ authCheck }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "black",
          padding: "25px",
        }}
      >
        {/* Left Side - MYBLOG */}
        <Typography variant="h5" fontWeight={700}>
          MY BLOG
        </Typography>

        {/* Right Side - Conditional Buttons */}
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {authCheck ? (
            // If authCheck is true, show Home, MyBlog, and Create Blog
            <>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/myblog">
                MyBlog
              </Button>
              <Button color="inherit" component={Link} to="/createblog">
                Create Blog
              </Button>
            </>
          ) : (
            // If authCheck is false, show Login button
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </Box>

        {/* Mobile Toggle Button */}
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <Button color="inherit" onClick={toggleMenu}>
            Menu
          </Button>
        </Box>

        {/* Mobile Menu Drawer */}
        <Drawer anchor="right" open={menuOpen} onClose={toggleMenu}>
          <Box sx={{ width: 250 }} role="presentation" onClick={toggleMenu} onKeyDown={toggleMenu}>
            <List>
              {authCheck ? (
                <>
                  <ListItem button component={Link} to="/">
                    <ListItemText primary="Home" />
                  </ListItem>
                  <ListItem button component={Link} to="/myblog">
                    <ListItemText primary="MyBlog" />
                  </ListItem>
                  <ListItem button component={Link} to="/createblog">
                    <ListItemText primary="Create Blog" />
                  </ListItem>
                </>
              ) : (
                <ListItem button component={Link} to="/login">
                  <ListItemText primary="Login" />
                </ListItem>
              )}
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

