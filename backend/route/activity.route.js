import express from "express";

import {
  getActivities,
} from "../controller/activity.controller.js";

const router = express.Router();

router.get("/", getActivities);

export default router;