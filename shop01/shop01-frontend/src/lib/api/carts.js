import client from './client';

export const addToCart = (product) => {
  console.log(product);
  return client.post('/api/carts', { product });
};

export const readCart = () => {
  return client.get('/api/carts');
};

export const updateItem = (id, quantity) => {
  return client.patch(`/api/carts/${id}`, { quantity });
};

export const deleteItem = (id) => {
  return client.delete(`/api/carts/${id}`);
};

export const deleteItems = (ids) => {
  return client.post('/api/carts/destroy', ids);
};
