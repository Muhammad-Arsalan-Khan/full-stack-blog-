import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    isPrivate:{
      type: Boolean,
      // default: false, // Default to public if not specified
    },
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    imageUrl: {
      type: String,
      default: "", // optional image
    },
  },
  { timestamps: true }
); // Correct

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
