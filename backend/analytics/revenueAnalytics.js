import Order from "../modal/order.model.js";

export const getMonthlyRevenue =
  async () => {
    return await Order.aggregate([
      {
        $group: {
          _id: {
            month: {
              $month: "$createdAt",
            },
          },
          revenue: {
            $sum: "$totalAmount",
          },
        },
      },
      {
        $sort: {
          "_id.month": 1,
        },
      },
    ]);
  };






  export const getYearlyRevenue =
  async () => {
    return await Order.aggregate([
      {
        $group: {
          _id: {
            year: {
              $year: "$createdAt",
            },
          },
          revenue: {
            $sum: "$totalAmount",
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
        },
      },
    ]);
  };




  export const getWeeklyRevenue =
  async () => {

    const sevenDaysAgo =
      new Date();

    sevenDaysAgo.setDate(
      sevenDaysAgo.getDate() - 6
    );

    return await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: sevenDaysAgo,
          },
        },
      },

      {
        $group: {
          _id: {
            dayOfWeek: {
              $dayOfWeek:
                "$createdAt",
            },
          },

          revenue: {
            $sum:
              "$totalAmount",
          },
        },
      },

      {
        $sort: {
          "_id.dayOfWeek": 1,
        },
      },
    ]);
  };