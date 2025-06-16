// checkToken.js
const checkToken = () => {
  const token = localStorage.getItem("token");

  if (token) {
    console.log("Token found:", token); 
    return true;
  } else {
    console.log("No token found"); 
    return false;
  }
};



export default checkToken;
