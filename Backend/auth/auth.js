import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config();

function setUser (userData) {
    return jwt.sign(
      {
        userId: userData.id,
        username: userData.username,
        email: userData.email,
      },
      process.env.JWT_SECRET,
    //   { expiresIn: "48h" }
    );
}

function verifyUser(token) {
    if (!token) {
        return null;
    }
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
}

export { setUser, verifyUser };