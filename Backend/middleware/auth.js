import { verifyUser } from "../auth/auth.js";
;

async function authCheck(req, res, next) {
  const token = req.cookies?.JWTtoken 
  
  console.log("Token received:", token);
  
  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  const userData = verifyUser(token);
  
  if (!userData) {
    return res.status(401).json({ message: "Invalid token" });
  }

  req.user = userData;
  next();
}

export { authCheck };