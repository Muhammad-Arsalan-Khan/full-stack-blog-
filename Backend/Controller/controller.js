import User from "../Models/userSchema.js";
import Blog from "../Models/blogSchema.js";
import bcrypt from "bcryptjs";
import { setUser } from "../auth/auth.js";
import { verifyEmail } from "../nodemailer/nodemailer.js";

const optGenrate = Math.floor(100000 + Math.random() * 900000);

const login = async (req, res) => {
  // console.log(req.cookies.JWTtoken)
  // console.log(req.headers)
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "field are required" });
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
    if (!existingUser.isVerified) {
      verifyEmail(existingUser.email, optGenrate);
      return res.status(401).json({
        message: "verify the email",
      });
    }
    const userData = {
      username: existingUser.username,
      email: existingUser.email,
      id: existingUser._id,
    };
    // const token = jwt.sign(
    //   userData,
    //   process.env.JWT_SECRET || SECRETKEY,
    //   { expiresIn: "24h" }
    // );
    const token = setUser(userData); //genrate token using setUser function
    console.log("Token generated:", token);
    //     agar ap production me ho tu
    //   res.cookie("JWTtoken", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',  // Set to false in local development
    //   sameSite: 'None', // Cross-origin support (if required)
    //   maxAge: 24 * 60 * 60 * 1000, // Cookie expiry time (1 day)
    // });

    // agar ap local me ho tu
    // res.cookie("JWTtoken", token,{
    //   httpOnly: true,
    //   secure: false, // Local development mein false karen
    //   sameSite: "None", // Cross-origin request allow karna
    //   // maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time
    // },);

    res.cookie("JWTtoken", token);
    res.status(200).json({
      message: "Login successful",
      user: userData,
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
      return res.status(400).json({ message: "field are required" });
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
      isActive: true, // Default to active
    });

    await newUser.save();
    verifyEmail(newUser.email, optGenrate);
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
    const {
      title,
      content,
      author,
      userId,
      imageUrl,
      isPrivate,
      likesArray,
      blogView,
      commitArray,
    } = req.body;
    console.log("Request body:", req.body);
    if (!title || !content || !author || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBlog = new Blog({
      userId, // Assuming you want to store the userId who created the blog
      title,
      content,
      author,
      isPrivate, // Default to public if not specified
      imageUrl,
      likesArray: [],
      blogView: "",
      commitArray: [],
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
  const id = req.params.id;
  try {
    const { title, content, author, imageUrl, isPrivate, userId } = req.body;
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
    console.error("Error updating blog:", error, error.message, error.code);
    return res.status(500).json({
      message: "Something went wrong while updating the blog!",
      error: error.message,
    });
  }
  //  res.status(200).json({ message: "update the blog" });
};

const deleteblogs = async (req, res) => {
  const blogId = req.params.id;
  try {
    const deletedBlog = await Blog.findByIdAndDelete(blogId);

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
};

const blogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ message: "No blogs found " });
    }
    const publicBlogs = blogs.filter((blog) => !blog.isPrivate);
    if (publicBlogs.length === 0) {
      return res.status(404).json({ message: "No public blogs found" });
    }

    res.status(200).json(publicBlogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//admin get all blogs
const allblogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ message: "No blogs found" });
    }
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get blogs by user ID
const getBlogByUserId = async (req, res) => {
  const UserId = req.params.id;
  try {
    const blogs = await Blog.find();
    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ message: "No blogs found" });
    }
    const userBlogs = blogs.filter((blog) => blog.userId == UserId);
    if (userBlogs.length === 0) {
      return res.status(404).json({ message: "you do not write any blog" });
    }
    res.status(200).json(userBlogs);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

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
};

const likeblogs = async (req, res) => {
  try {
    const postId = req.params.id;
    const { likes } = req.body; // likes should be the user ID who is liking or unliking
    console.log(likes); // To see the like ID

    if (!likes) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find the blog post by ID
    const blog = await Blog.findById(postId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if the user has already liked the blog
    const index = blog.likesArray.indexOf(likes);

    if (index > -1) {
      // User has already liked, so remove the like
      blog.likesArray.splice(index, 1);
      console.log(`User ${likes} unliked the blog`);
    } else {
      // User has not liked, so add the like
      blog.likesArray.push(likes);
      console.log(`User ${likes} liked the blog`);
    }

    // Save the updated blog
    const updatedBlog = await blog.save();

    console.log("Blog like status updated successfully:", updatedBlog);
    return res.status(201).json({
      message: "Blog like status updated successfully!",
      updateBlog: updatedBlog,
    });
  } catch (error) {
    console.error("Error updating blog:", error.message);
    return res.status(500).json({
      message: "Something went wrong while updating the blog!",
      error: error.message,
    });
  }
};

const commitBlogs = async (req, res) => {
  const blogId = req.params.id;
  try {
    const { commit } = req.body;
    if (!blogId) {
      return res.status(400).json({ message: "Blog ID is required" });
    }
    if (!commit) {
      return res.status(400).json({ message: "write a commit" });
    }
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.commitArray.push(commit);
    console.log(`User -> ${commit} `);
    const updatedBlog = await blog.save();

    console.log("user successfully commit:", updatedBlog);
    return res.status(201).json({
      message: "Blog commit status updated successfully!",
      updateBlog: updatedBlog,
    });
  } catch (error) {
    console.error("Error committing blog:", error, error.message, error.code);
    return res.status(500).json({
      error: error.message,
      message: "Something went wrong while committing the blog!",
    });
  }
};

//admin get all users
const allUser = async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const userUpdate = async (req, res) => {
  const userId = req.params.userId;
  try {
    const { isActive } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    // const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        isActive,
        updatedAt: new Date(),
      },
      { new: true }
    ); // ya update doc retuern karega;
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("User update successfully:", updatedUser);
    return res.status(201).json({
      message: "User update successfully!",
      updateUser: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error, error.message, error.code);
    return res.status(500).json({
      message: "Something went wrong while updating the user!",
      error: error.message,
    });
  }
};

const opt = async (req, res) => {
  const userId = req.params.id;
  console.log(optGenrate)
  try {
    const { isVerified, optvalue } = req.body;
    console.log(optvalue, optGenrate)
    console.log(typeof optGenrate)
    console.log(typeof optvalue)
    const OtpValue = Number(optvalue)
    console.log(OtpValue)
    if (OtpValue !== optGenrate){
      return res.status(401).json({ message: "wrong OTP" });
    }
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        isVerified,
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("User update successfully:", updatedUser);
    return res.status(201).json({
      message: "Approved",
      updateUser: updatedUser,
    });
    optGenrate = "";
  } catch (error) {
    console.error("Error updating user:", error, error.message, error.code);
    return res.status(500).json({
      message: "Something went wrong while updating the user!",
      error: error.message,
    });
  }
};

export {
  login,
  signup,
  createblogs,
  Updateblogs,
  deleteblogs,
  blogs,
  getBlogByUserId,
  getBlogById,
  likeblogs,
  allblogs,
  allUser,
  userUpdate,
  commitBlogs,
  opt,
};
