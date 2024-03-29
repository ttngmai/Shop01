import client from './client';
import qs from 'qs';

export const createCategory = ({ id, name }) =>
  client.post('/api/admin/categories', { id, name });

export const listCategories = (name) => {
  const queryString = qs.stringify({ name });

  return client.get(`/api/categories?${queryString}`);
};

export const updateCategory = ({ id, name }) =>
  client.patch(`/api/admin/categories/${id}`, { name });

export const deleteCategory = (id) =>
  client.delete(`/api/admin/categories/${id}`);
