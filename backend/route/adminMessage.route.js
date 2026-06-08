import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";

import {
  getAllMessages,
  deleteMessage,
} from "../controller/adminMessage.controller.js";

const router = express.Router();

router.get(
  "/all",
  authMiddleware,
  getAllMessages
);

router.delete(
  "/:id",
  authMiddleware,
  deleteMessage
);

export default router;