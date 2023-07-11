import express from "express";
import cors from "cors";
import session from 'express-session';
import "./loadEnvironment.mjs";
import userRouter from "./db/routes/user.mjs";
import sessionRouter from './db/routes/session.mjs';
import postRouter from './db/routes/post.mjs';
import commentRouter from './db/routes/comment.mjs';

const PORT = process.env.PORT || 5050;
const app = express();

// Set up CORS to accept credentials
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// Add express-session middleware
app.use(session({
  secret: 'Rocket', 
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, 
    httpOnly: false,
    maxAge: 24 * 60 * 60 * 1000 // Session will last 24 hours
  }
}));

app.use((req, res, next) => {
  next();
});

app.use("/user", userRouter);
app.use("/", sessionRouter);

// Register the post router at the /post route
app.use("/post", postRouter);
app.use('/comment', commentRouter);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
