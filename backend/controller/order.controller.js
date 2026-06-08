import Order from "../modal/order.model.js";

// CREATE ORDER
export const createOrder = async (req, res) => {
  try {


  const expectedDeliveryDate = new Date();

expectedDeliveryDate.setDate(
  expectedDeliveryDate.getDate() + 5
);


   const order = await Order.create({
  ...req.body,
  expectedDeliveryDate,
});
    res.status(201).json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// USER ORDERS
export const getUserOrders = async (
  req,
  res
) => {
  try {

    const orders = await Order.find({
      userId: req.params.userId,
    })
      .populate("items.bookId")
      .sort({ createdAt: -1 });

      console.log(
      JSON.stringify(orders, null, 2)
    );

    res.status(200).json(orders);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};


// ALL ORDERS (ADMIN)

export const getAllOrders = async (
  req,
  res
) => {
  try {

    const orders = await Order.find()
      .populate("items.bookId")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};


// CANCEL ORDER
export const cancelOrder = async (
  req,
  res
) => {
  try {

    const order = await Order.findById(
      req.params.orderId
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (
      ![
        "Order Placed",
        "Confirmed",
        "Packed",
      ].includes(order.status)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Order can no longer be cancelled",
      });
    }

    order.status = "Cancelled";

    await order.save();

    res.status(200).json({
      success: true,
      message:
        "Order Cancelled Successfully",
      order,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// UPDATE ORDER STATUS (ADMIN)
export const updateOrderStatus = async (
  req,
  res
) => {
  try {

    const { status } = req.body;

    const updateData = { status };

if (status === "Delivered") {
  updateData.deliveredAt = new Date();
}

    const order =
  await Order.findByIdAndUpdate(
    req.params.orderId,
    updateData,
    { new: true }
  );

    res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// RETURN REQUEST
export const requestReturnOrder = async (
  req,
  res
) => {
  try {

    const {
      bookId,
      returnReason,
      refundType,
    } = req.body;

    const order = await Order.findById(
      req.params.orderId
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const item = order.items.find(
      (item) =>
        item.bookId.toString() ===
        bookId
    );


if (item.returnRequested) {
  return res.status(400).json({
    success: false,
    message:
      "Return request already submitted",
  });
}


    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Book not found in order",
      });
    }

    item.returnRequested = true;

    item.returnReason =
      returnReason;

    item.refundType =
      refundType;

    item.returnStatus =
      "Pending";

    await order.save();

    res.status(200).json({
      success: true,
      message:
        "Return request submitted successfully",
      order,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


export const cancelReturnRequest =
  async (req, res) => {

    try {

      const { bookId } = req.body;

      const order =
        await Order.findById(
          req.params.orderId
        );

      const item =
        order.items.find(
          (i) =>
            i.bookId.toString() ===
            bookId
        );

      if (!item) {
        return res.status(404).json({
          success: false,
          message: "Item not found",
        });
      }

      item.returnRequested = false;
      item.returnReason = "";
      item.refundType = "";
      item.returnStatus = "";

      await order.save();

      res.json({
        success: true,
        message:
          "Return request cancelled",
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }
};


export const updateReturnStatus = async (
  req,
  res
) => {
  try {

    const {
      bookId,
      returnStatus,
    } = req.body;

    const order = await Order.findById(
      req.params.orderId
    );

    if (!order) {
      return res.status(404).json({
        message: "Order Not Found",
      });
    }

    const item = order.items.find(
      (item) =>
        item.bookId.toString() ===
        bookId
    );

    if (!item) {
      return res.status(404).json({
        message: "Item Not Found",
      });
    }

    item.returnStatus =
      returnStatus;

    await order.save();

    res.status(200).json({
      success: true,
      message:
        "Return Status Updated",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};