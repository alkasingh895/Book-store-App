import api from "./axios";

export const topSellingBooksApi = {

  async getTopSellingBooks() {

    const response =
      await api.get(
        "/api/top-selling-books"
      );

    return response.data;
  },

};