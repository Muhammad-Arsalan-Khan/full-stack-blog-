import React from 'react'
import { Toolbar, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";


function AdminDashboard() {
  return (
    <>
       <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "black",
          padding: "25px",
        }}>
        <Typography variant="h5" fontWeight={700} color='white'>
                 Admin Dashboard
        </Typography>
        <Box>
              <Button color="inherit" component={Link} to="/admin/allblog" sx={{ color: 'white' }}>
                All Blog 
              </Button>
              <Button color="inherit" component={Link} to="/admin/alluser" sx={{ color: 'white' }}>
                All User
              </Button>
        </Box>

        </Toolbar>
    </>
  )
}

export default AdminDashboard