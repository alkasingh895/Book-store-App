import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js"; 
import userRoute from "./route/user.route.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const URL = process.env.MONGO_URL;

// Connect to MongoDB
try {
  mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log(" Connected to MongoDB");
} catch (error) {
  console.log("MongoDB Connection Error: ", error);
}

// Middleware to parse JSON (important if you're using POST/PUT)
app.use(express.json());

// Route define
app.use("/book", bookRoute);
app.use("/user",userRoute);

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
