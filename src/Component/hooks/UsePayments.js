// src/hooks/usePayments.js
import { useState, useEffect } from 'react';
import paymentService from '../Component/Services/paymentService';

export const usePayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPayments = async () => {
    try {
      setLoading(true);
      const data = await paymentService.getAllPayments();
      setPayments(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

  const addPayment = async (payment) => {
    try {
      await paymentService.addPayment(payment);
      await loadPayments();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const updatePayment = async (id, payment) => {
    try {
      await paymentService.updatePayment(id, payment);
      await loadPayments();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const deletePayment = async (id) => {
    try {
      await paymentService.deletePayment(id);
      await loadPayments();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  return {
    payments,
    loading,
    error,
    addPayment,
    updatePayment,
    deletePayment,
  };
};

// src/utils/formatters.js
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};