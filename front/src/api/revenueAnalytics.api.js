import api from "./axios";

export const revenueAnalyticsApi = {
  async getRevenueAnalytics() {
    const response = await api.get(
      "/api/revenue-analytics"
    );

    return response.data;
  },
};