import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL,{
    autoIndex: true
})
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions))

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  console.log(err);
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
