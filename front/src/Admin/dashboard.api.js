import api from "../api/axios";

export const dashboardApi = {

  async getStats() {

    const response = await api.get(
      "/admin/dashboard/stats"
    );

    return response.data;
  },

};