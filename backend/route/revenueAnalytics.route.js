import express from "express";

import {
  getRevenueAnalytics,
} from "../controller/revenueAnalytics.controller.js";

const router = express.Router();

router.get(
  "/revenue-analytics",
  getRevenueAnalytics
);

export default router;