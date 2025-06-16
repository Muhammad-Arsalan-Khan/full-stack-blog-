import React from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link } from 'react-router-dom';


const Navbar = ({ authCheck }) => {
  return (
    <AppBar position="sticky">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor:'black', padding:'25px'}}>
        {/* Left Side - MYBLOG */}
        <Typography variant="h5" fontWeight={700}>
          MY BLOG
        </Typography>

        {/* Right Side - Conditional Buttons */}
        <Box>
          {authCheck ? (
            // If authCheck is true, show Home, MyBlog, and Create Blog
            <>
              <Button color="inherit" component={Link} to="/">Home</Button>
              <Button color="inherit" component={Link} to="/myblog">MyBlog</Button>
              <Button color="inherit" component={Link} to="/createblog">Create Blog</Button>
            </>
          ) : (
            // If authCheck is false, show Login button
            <Button color="inherit" component={Link} to="/login">Login</Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

