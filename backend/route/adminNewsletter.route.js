import express from "express";
import {
  getAllSubscribers,
  deleteSubscriber,
} from "../controller/adminNewsletter.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();
router.get(
  "/all",
  authMiddleware,
  getAllSubscribers
);

router.delete(
  "/:id",
  authMiddleware,
  deleteSubscriber
);

export default router;