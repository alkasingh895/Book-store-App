import dotenv from "dotenv";
dotenv.config();

console.log(
  "INDEX STRIPE =",
  process.env.STRIPE_SECRET_KEY
);


import express from "express";
import mongoose from "mongoose";

import cors from "cors";


import bookRoute from "./route/book.route.js"; 
import userRoute from "./route/user.route.js";
import contactRoute from "./route/contact.route.js";
import newsletterRoute from "./route/newsletter.route.js";
import adminMessageRoute from "./route/adminMessage.route.js";
import adminNewsletterRoute from "./route/adminNewsletter.route.js";
import adminDashboardRoute from "./route/adminDashboard.route.js";
import passwordRoutes from "./route/password.route.js";
import activityRoute from "./route/activity.route.js";
import cartRoute from "./route/cart.route.js";
import orderRoute from "./route/order.route.js";
import watchlistRoute from "./route/watchlist.route.js";
import topSellingBooksRoute
from "./route/topSellingBooks.route.js";


import revenueAnalyticsRoute
from "./route/revenueAnalytics.route.js";

import orderStatusAnalyticsRoute
from "./route/orderStatusAnalytics.route.js";



import aiRecommendationRoute
from "./route/aiRecommendation.route.js";



import paymentRoute
from "./route/payment.route.js";


const app = express();


app.use(cors()); // abhi local dev ke liye purana jaisa — deploy par upar wala uncomment kar sakte ho

app.use(express.json());


app.use("/newsletter", newsletterRoute);
app.use("/admin/messages", adminMessageRoute);
app.use("/admin/newsletter", adminNewsletterRoute);
app.use("/admin/dashboard", adminDashboardRoute);
app.use("/password", passwordRoutes);
app.use("/activity", activityRoute);

const PORT = process.env.PORT || 5000;
const URL = process.env.MONGO_URL;

// JWT secret (admin-only auth ke liye)
if (!process.env.JWT_SECRET) {
  console.warn("[WARN] JWT_SECRET is not set in .env. Set it to enable admin auth.");
}


const connectDB = async () => {
  try {
    
    await mongoose.connect(URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("MongoDB Connection Error:", error);
    process.exit(1);
  }
};


app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/contact", contactRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);
app.use("/watchlist", watchlistRoute);



app.use(
  "/api",
  revenueAnalyticsRoute
);

app.use(
  "/api",
  orderStatusAnalyticsRoute
);

app.use(
  "/api",
  topSellingBooksRoute
);


app.use(
  "/api",
  aiRecommendationRoute
);


app.use(
  "/payment",
  paymentRoute
);


const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
