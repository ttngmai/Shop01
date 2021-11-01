import client from './client';

export const listShippingAddresses = () => {
  return client.get('/api/shipping-addresses');
};

export const registerShippingAddress = (formData) => {
  return client.post('/api/shipping-addresses', formData);
};

export const readShippingAddress = (id = 'default') => {
  return client.get(`/api/shipping-addresses/${id}`);
};

export const updateShippingAddress = ({ id, address2, is_default }) => {
  return client.patch(`/api/shipping-addresses/${id}`, {
    address2,
    is_default,
  });
};

export const deleteShippingAddress = (id) => {
  return client.delete(`/api/shipping-addresses/${id}`);
};
