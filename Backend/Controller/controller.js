import User from "../Models/userSchema.js";
import Blog from "../Models/blogSchema.js";
import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
const SECRETKEY = "721121821118";

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
      return res.status(400).json({message: "field are required" })
    }
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        message: "account does not exists",
      });
    }
    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid Email & Password" });
    }
    const userData = {
        username: existingUser.username,
        email: existingUser.email,
        id: existingUser._id,
    }
    // const token = jwt.sign(
    //   {
    //     userId: existingUser._id,
    //     username: existingUser.username,
    //     email: existingUser.email,
    //   },
    //   process.env.JWT_SECRET || SECRETKEY,
    //   { expiresIn: "24h" }
    // );

    res.status(200).json({
      message: "Login successful",
      token: userData,
    });
  } catch (error) {
    console.log(error, error.message, error.code);
    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }

  //   return res.status(200).json({ message: "Login successful" });
};

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({message: "field are required",})
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "account already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(201).json({
      message: "User registered successfully!",
      user: {
        username: newUser.username,
        email: newUser.email,
        id: newUser._id,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email already exists, please choose another one.",
      });
    }

    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

const createblogs = async (req, res) => {
  // res.status(200).json({
  //   message: "Blogs endpoint is working",
  // });
  try {
    const { title, content, author, userId, imageUrl, isPrivate  } = req.body;
    console.log("Request body:", req.body);
    if (!title || !content || !author || !userId ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newBlog = new Blog({
      userId, // Assuming you want to store the userId who created the blog
      title,
      content,
      author,
      isPrivate, // Default to public if not specified
      imageUrl, // Optional image URL
    });
    await newBlog.save();
    console.log("Blog saved successfully:", newBlog);
    return res.status(201).json({
      message: "Blog saved successfully!",
      blog: newBlog,
    });
  } catch (error) {
    console.error("Error saving blog:", error, error.message, error.code);
    return res.status(500).json({
      message: "Something went wrong while saving the blog!",
      error: error.message,
    });
  }
};

const Updateblogs = async (req, res) => {
  try {
    const { id, title, content, author, imageUrl, isPrivate, userId } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Blog ID is required" });
    }
    const UpdatedBlog = await Blog.findByIdAndUpdate(
       id,
      {
        title,
        userId,
        content,
        author,
        imageUrl,
        isPrivate,
        updatedAt: new Date(),
      },
      { new: true }
    ); // ya update doc retuern karega;
    if (!UpdatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    console.log("Blog update successfully:", UpdatedBlog);
    return res.status(201).json({
      message: "Blog update successfully!",
      updateBlog: UpdatedBlog,
    });
  } catch (error) {
    console.error("Error updating blog:", error, error.message, error.code );
    return res.status(500).json({
      message: "Something went wrong while updating the blog!",
      error: error.message,
    });
  }
//  res.status(200).json({ message: "update the blog" });
};

const deleteblogs = async (req , res ) =>{
  const blogId = req.params.id;
  try {
    const deletedBlog = await Blog.findByIdAndDelete(blogId)

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({
      message: "Blog deleted successfully",
      deletedUser: deletedBlog,
    });

  } catch (error) {
    console.error("Error deleting blog:", error, error.message, error.code);
    return res.status(500).json({
      message: "Something went wrong while deleting the blog!",
      error: error.message,
    });
  }
  // res.status(200).json({ message: "delete the blog" });
}


const blogs = async (req, res) => {
  try {
        const blogs = await Blog.find();
        if (!blogs || blogs.length === 0) {
            return res.status(404).json({ message: "No blogs found" });
        }
        const publicBlogs = blogs.filter(blog => !blog.isPrivate);
        if (publicBlogs.length === 0) {
            return res.status(404).json({ message: "No public blogs found" });
           }

         res.status(200).json(publicBlogs);

    } catch (error) {
        console.error("Error fetching blogs:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// Get blogs by user ID
const getBlogByUserId = async (req, res) => {
  const UserId = req.params.id;
  try {
    const blogs = await Blog.find();
    if (!blogs || blogs.length === 0) {
            return res.status(404).json({ message: "No blogs found" });
    }
    const userBlogs = blogs.filter(blog => blog.userId == UserId);
        if (userBlogs.length === 0) {
            return res.status(404).json({ message: "you do not write any blog" });
           }
    res.status(200).json(userBlogs)
  } catch (error) {
    console.error("Error fetching blog:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

//Get single blog
const getBlogById = async (req, res) => {
  const blogId = req.params.id;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    } 
    return res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export { login, signup, createblogs, Updateblogs, deleteblogs, blogs, getBlogByUserId, getBlogById};

