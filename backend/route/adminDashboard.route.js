import express from "express";

import { getDashboardStats } from "../controller/adminDashboard.controller.js";

const router = express.Router();

router.get("/stats", getDashboardStats);

export default router;