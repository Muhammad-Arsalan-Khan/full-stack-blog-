import express from 'express';
import { connectMongoDB } from './connection.js';
import dotenv from 'dotenv'
import { logReqRes } from './middleware/middleware.js';
import BlogRoute from './Routes/routes.js';
import homeRoute from './Routes/homeRoute.js';
import BlogAuthRoute from './Routes/authRoutes.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { authCheck } from './middleware/auth.js';
const app = express();


// Load environment variables
dotenv.config();

app.use(logReqRes("log.txt"))
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:5174', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH',], 
  credentials: true, 
};

app.use(cors(corsOptions));
app.use(cookieParser())


connectMongoDB(process.env.MONGO_URI).then(()=>{console.log("connect to MongoDB")});
//"mongodb://127.0.0.1:27017/BlogApp"
//userName = blogadmin
//password = 7211Blogpass1181
//mongodb+srv://blogadmin:7211Blogpass1181@blogcluster.e43lnfu.mongodb.net/
//mongodb+srv://blogadmin:7211Blogpass1181@blogcluster.e43lnfu.mongodb.net/?retryWrites=true&w=majority&appName=BlogCluster

// Basic route
app.use("/", homeRoute);
app.use("/auth", BlogAuthRoute);
app.use("/service", authCheck, BlogRoute);
// app.use("/service", authCheck,  BlogRoute); 
// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
