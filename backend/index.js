import express from 'express'; // Importing Express.js framework
import mongoose from 'mongoose'; // Importing Mongoose for MongoDB object modeling
import dotenv from 'dotenv'; // Importing dotenv for environment variables
import userRoutes from './routes/user.route.js'; // Importing user routes
import authRoutes from './routes/auth.route.js'; // Importing authentication routes
import postRoutes from './routes/post.route.js'; // Importing post routes
import commentRoutes from './routes/comment.route.js'; // Importing comment routes
import cookieParser from 'cookie-parser'; // Importing cookie-parser middleware for parsing cookies
import cors from 'cors'; // Importing CORS middleware for enabling cross-origin resource sharing

dotenv.config(); // Loading environment variables from .env file

// Connecting to MongoDB database
mongoose
  .connect(process.env.MONGO_URL, {
    autoIndex: true // Optional: Enable autoIndex for MongoDB
  })
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express(); // Creating an Express application

// CORS options for allowing cross-origin requests with credentials
const corsOptions = {
  origin: true, // Allow requests from all origins
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(express.json()); // Parsing incoming request bodies as JSON
app.use(cookieParser()); // Parsing cookies from incoming requests
app.use(cors(corsOptions)); // Enabling CORS with specified options

// Starting the server
app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

// Routes for different functionalities
app.use('/api/user', userRoutes); // User-related routes
app.use('/api/auth', authRoutes); // Authentication-related routes
app.use('/api/post', postRoutes); // Post-related routes
app.use('/api/comment', commentRoutes); // Comment-related routes

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500; // Set status code to error's status or default to 500 (Internal Server Error)
  const message = err.message || 'Internal Server Error'; // Set error message to error's message or default message
  console.log(err); // Log the error for debugging
  res.status(statusCode).json({ // Send error response with status code and message
    success: false,
    statusCode,
    message,
  });
});
