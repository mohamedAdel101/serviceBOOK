// src/services/paymentService.js
const BASE_URL = 'https://your-api-endpoint.com'; // Replace with your actual API endpoint

const paymentService = {
  async getAllPayments() {
    const response = await fetch(`${BASE_URL}/payments`);
    if (!response.ok) {
      throw new Error('Failed to fetch payments');
    }
    return response.json();
  },

  async addPayment(payment) {
    const response = await fetch(`${BASE_URL}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payment),
    });
    if (!response.ok) {
      throw new Error('Failed to add payment');
    }
    return response.json();
  },

  async updatePayment(id, payment) {
    const response = await fetch(`${BASE_URL}/payments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payment),
    });
    if (!response.ok) {
      throw new Error('Failed to update payment');
    }
    return response.json();
  },

  async deletePayment(id) {
    const response = await fetch(`${BASE_URL}/payments/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete payment');
    }
    return response.json();
  },
};

export default paymentService;
