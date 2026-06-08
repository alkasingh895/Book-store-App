import express from "express";

import {
  createCheckoutSession,
  verifyStripePayment,
} from "../controller/payment.controller.js";

const router =
  express.Router();

router.post(
  "/create-checkout-session",
  createCheckoutSession
);

router.get(
  "/verify",
  verifyStripePayment
);

export default router;