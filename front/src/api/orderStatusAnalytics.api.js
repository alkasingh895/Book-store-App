import api from "./axios";

export const orderStatusApi = {

  async getOrderStatus() {

    const response =
      await api.get(
        "/api/order-status"
      );

    return response.data;
  },

};