import express from "express";
import { createOrder , getUserOrders, cancelOrder , updateOrderStatus , getAllOrders , requestReturnOrder, cancelReturnRequest , updateReturnStatus } from "../controller/order.controller.js";

const router = express.Router();

router.post("/create", createOrder);


router.get(
  "/user/:userId",
  getUserOrders
);

router.put(
  "/cancel/:orderId",
  cancelOrder
);


router.put(
  "/status/:orderId",
  updateOrderStatus
);

router.put(
  "/return/:orderId",
  requestReturnOrder
);


router.put(
  "/cancel-return/:orderId",
  cancelReturnRequest
);



router.get(
  "/all",
  getAllOrders
);



router.put(
  "/return-status/:orderId",
  updateReturnStatus
);




export default router;