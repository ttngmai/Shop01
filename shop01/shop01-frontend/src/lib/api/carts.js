import client from './client';

export const readCart = () => {
  return client.get('/api/carts');
};

export const deleteItem = (id) => {
  return client.delete(`/api/carts/${id}`);
};
