import Order from "../modal/order.model.js";

export const getOrderStatusAnalytics =
  async (req, res) => {
    try {

      const delivered =
        await Order.countDocuments({
          status: "Delivered",
        });




     const totalOrders =
  await Order.countDocuments();
  
  

      const pending =
        await Order.countDocuments({
          status: {
            $nin: [
              "Delivered",
              "Cancelled",
            ],
          },
        });

      const cancelled =
        await Order.countDocuments({
          status: "Cancelled",
        });

      const returned =
        await Order.countDocuments({
          "items.returnStatus":
            "Approved",
        });

      res.status(200).json({
        success: true,
        totalOrders,
        
        delivered,
        pending,
        cancelled,
        returned,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
      });

    }
  };