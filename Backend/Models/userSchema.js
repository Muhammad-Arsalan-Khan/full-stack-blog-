import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    isActive
    : {
      type: Boolean,
      default: true, // Default to active
    },
  },
  { timestamps: true }
); // Correct

const User = mongoose.model("User", userSchema);

export default User;

// const blogId = req.params.Id;
//     console.log("blogId", blogId);
