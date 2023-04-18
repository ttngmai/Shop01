import client from './client';
import qs from 'qs';

export const createOrder = ({ products, amount }) =>
  client.post('/api/orders', { products, amount });

export const listOrders = ({ page }) => {
  const queryString = qs.stringify({ page });

  return client.get(`/api/orders?${queryString}`);
};

export const readChart = ({ year, month }) => {
  const queryString = qs.stringify({
    year,
    month,
  });

  return client.get(`/api/orders/chart?${queryString}`);
};

export const updateOrder = ({ id, order_status_id }) =>
  client.patch(`/api/orders/${id}`, { order_status_id });

export const refund = ({ merchant_uid, reason, cancel_request_amount }) =>
  client.post(`/api/orders/refund`, {
    merchant_uid,
    reason,
    cancel_request_amount,
  });
