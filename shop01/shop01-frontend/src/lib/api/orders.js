import client from './client';

export const createOrder = ({ products, amount }) => {
  return client.post('/api/orders', { products, amount });
};

export const listOrders = () => {
  return client.get('/api/orders');
};

export const refund = ({ merchant_uid, reason, cancel_request_amount }) => {
  return client.post(`/api/orders/refund`, {
    merchant_uid,
    reason,
    cancel_request_amount,
  });
};
