import express from "express";

import {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
} from "../controller/watchlist.controller.js";

const router = express.Router();

router.post(
  "/add",
  addToWatchlist
);

router.get(
  "/:userId",
  getWatchlist
);

router.delete(
  "/:userId/:bookId",
  removeFromWatchlist
);

export default router;