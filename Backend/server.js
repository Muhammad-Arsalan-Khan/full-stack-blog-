import express from 'express';
import { connectMongoDB } from './connection.js';
import dotenv from 'dotenv'
import { logReqRes } from './middleware/middleware.js';
import BlogRoute from './Routes/routes.js';
import cors from 'cors'
const app = express();

// Load environment variables
dotenv.config();

app.use(logReqRes("log.txt"))
app.use(express.json());
app.use(cors());

// Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected successfully'))
//   .catch(err => console.error('MongoDB connection error:', err));

connectMongoDB(process.env.MONGO_URI).then(()=>{console.log("connect to MongoDB")});
//"mongodb://127.0.0.1:27017/BlogApp"
//userName = blogadmin
//password = 7211Blogpass1181
//mongodb+srv://blogadmin:7211Blogpass1181@blogcluster.e43lnfu.mongodb.net/
//mongodb+srv://blogadmin:7211Blogpass1181@blogcluster.e43lnfu.mongodb.net/?retryWrites=true&w=majority&appName=BlogCluster

// Basic route
app.use("/", BlogRoute);
// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
