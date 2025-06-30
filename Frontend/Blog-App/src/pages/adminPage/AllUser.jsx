// import React, { useEffect, useState } from "react";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Switch, Typography } from "@mui/material";
// import axios from "axios";

// const AllUser = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch users from API
//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/service/admin/alluser", { withCredentials: true });
//       setUsers(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Handle toggle switch change for a user
//   const handleStatus= async (userId) => {
//     const updatedUsers = users.map((user) => {
//       if (user._id === userId) {
//         return { ...user, isActive: !user.isActive }; // Toggle isActive status
//       }
//       return user;
//     });
//     setUsers(updatedUsers);

      
      
//   };

//   if (loading) {
//     return <Typography>Loading...</Typography>;
//   }

//   return (
//     <TableContainer component={Paper} sx={{ width: "80%", margin: "50px auto" }}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell><strong>Username</strong></TableCell>
//             <TableCell><strong>Email</strong></TableCell>
//             <TableCell><strong>Status</strong></TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {users.map((user) => (
//             <TableRow key={user._id}>
//               <TableCell>{user.username}</TableCell>
//               <TableCell>{user.email}</TableCell>
//               <TableCell>
//                 <Switch
//                 //   checked={user.isActive || false} // Assume 'isActive' defines if the user is active
//                   defaultChecked={user.isActive}
//                   onChange={()=>handleStatus(user._id)}
//                   color="primary"
//                 />
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default AllUser;



import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Switch, Typography } from "@mui/material";
import axios from "axios";

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/service/admin/alluser", { withCredentials: true });
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle toggle switch change for a user
  const handleStatus = async (userId, currentStatus) => {
    // console.log(userId, currentStatus)
    const updatedStatus = !currentStatus; // Toggle the current status

    try {
      // Sending the PUT request to update the user's status on the server
      const res = await axios.put(
        `http://localhost:5000/service/admin/userUpdate/${userId}`,
        { isActive: updatedStatus },
        { withCredentials: true } // Send cookies along with the request
      );

      // After successful update, update the state locally
      const updatedUsers = users.map((user) => {
        if (user._id === userId) {
          return { ...user, isActive: updatedStatus }; // Update the local user's isActive status
        }
        return user;
      });

      setUsers(updatedUsers); // Update the users state to reflect the change
    } catch (error) {
      console.error("Error updating user status:", error);
      console.log(error.message);
      console.log(error.code)
  }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ width: "80%", margin: "50px auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Username</strong></TableCell>
            <TableCell><strong>Email</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Switch
                  checked={user.isActive} // Reflect the actual isActive status
                  onChange={() => handleStatus(user._id, user.isActive)} // Trigger the status update
                  color="primary"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllUser;
