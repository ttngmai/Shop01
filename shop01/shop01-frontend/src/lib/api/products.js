import client from './client';
import qs from 'qs';

export const listProducts = ({ category, name, page }) => {
  const queryString = qs.stringify({
    category,
    name,
    page,
  });
  return client.get(`/api/products?${queryString}`);
};

export const registerProduct = (data) => {
  client.post('api/products', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const readProduct = (id) => client.get(`/api/products/${id}`);
