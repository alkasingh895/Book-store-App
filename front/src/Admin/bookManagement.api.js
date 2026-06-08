import api from '../api/axios';

const getAdminToken = () => {
  try {
    return JSON.parse(localStorage.getItem('AdminUser') || '{}')?.token;
  } catch {
    return undefined;
  }
};

export const bookApi = {
  async listBooks() {
    const res = await api.get('/book');
    return res.data;
  },

  async addBook(payload) {
    const token = getAdminToken();
    const res = await api.post('/book', payload, {
      headers: { Authorization: token ? `Bearer ${token}` : '' },
    });
    return res.data;
  },

  async updateBook(id, payload) {
    const token = getAdminToken();
    const res = await api.put(`/book/${id}`, payload, {
      headers: { Authorization: token ? `Bearer ${token}` : '' },
    });
    return res.data;
  },

  async deleteBook(id) {
    const token = getAdminToken();
    const res = await api.delete(`/book/${id}`, {
      headers: { Authorization: token ? `Bearer ${token}` : '' },
    });
    return res.data;
  },
};


