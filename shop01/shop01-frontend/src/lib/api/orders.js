import client from './client';

export const listOrders = () => {
  return client.get('/api/orders');
}

export const refund = (merchant_uid) => {
  return client.post(`/api/orders/refund/${merchant_uid}`);
}