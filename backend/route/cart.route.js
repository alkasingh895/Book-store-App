import express from "express";

import {
  addToCart,
  getCart,
  removeFromCart,
  updateQuantity,
  clearCart
} from "../controller/cart.controller.js";

const router = express.Router();

router.post(
  "/add",
  addToCart,
  
);

router.get(
  "/:userId",
  getCart
);

router.delete(
  "/:id",
  removeFromCart
);


router.put(
  "/update",
  updateQuantity
);



router.delete(
  "/clear/:userId",
  clearCart
);
export default router;