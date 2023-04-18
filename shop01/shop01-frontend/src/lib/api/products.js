import client from './client';
import qs from 'qs';

export const registerProduct = (formData) =>
  client.post('/api/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const listProducts = ({ category, name, page }) => {
  const queryString = qs.stringify({
    category,
    name,
    page,
  });

  return client.get(`/api/products?${queryString}`);
};

export const listProductsForAdmin = ({ category, name, page }) => {
  const queryString = qs.stringify({
    category,
    name,
    page,
  });

  return client.get(`/api/admin/products?${queryString}`);
};

export const readProduct = (id) => client.get(`/api/products/${id}`);

export const updateProduct = ({ id, category, name, price }) =>
  client.patch(`/api/admin/products/${id}`, {
    category,
    name,
    price,
  });

export const updateDisplay = ({ id, display }) =>
  client.patch(`/api/admin/products/${id}/display`, { display });
