import client from './client';

export const register = (formData) =>
  client.post('/api/auth/register', formData);

export const login = ({ email, password }) =>
  client.post('/api/auth/login', { email, password });

export const check = () => client.get('/api/auth/check');

export const logout = () => client.post('/api/auth/logout');
