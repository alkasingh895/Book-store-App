import express from "express";

import {
  getTopSellingBooks,
} from "../analytics/topSellingBooksAnalytics.js";

const router =
  express.Router();

router.get(
  "/top-selling-books",
  getTopSellingBooks
);

export default router;