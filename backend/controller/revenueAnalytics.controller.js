import {
  getWeeklyRevenue,
  getMonthlyRevenue,
  getYearlyRevenue,
} from "../analytics/revenueAnalytics.js";

export const getRevenueAnalytics =
  async (req, res) => {
    try {

      const weeklyRevenue =
        await getWeeklyRevenue();

      const monthlyRevenue =
        await getMonthlyRevenue();

      const yearlyRevenue =
        await getYearlyRevenue();

      res.status(200).json({
        success: true,
        weeklyRevenue,
        monthlyRevenue,
        yearlyRevenue,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to load revenue analytics",
      });

    }
  };