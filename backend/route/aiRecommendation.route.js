import express from "express";

import {
  getAIRecommendations,
} from "../controller/aiRecommendation.controller.js";

const router =
  express.Router();

router.get(
  "/ai-recommendations/:id",
  getAIRecommendations
);

export default router;