import express from "express";

import {
  getOrderStatusAnalytics,
} from "../analytics/orderStatusAnalytics.js";

const router =
  express.Router();

router.get(
  "/order-status",
  getOrderStatusAnalytics
);

export default router;