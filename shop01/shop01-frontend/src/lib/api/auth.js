import client from './client';

export const register = ({ email, password, nick, phone }) =>
  client.post('/api/auth/register', { email, password, nick, phone });

export const login = ({ email, password }) =>
  client.post('/api/auth/login', { email, password });

export const check = () => client.get('/api/auth/check');

export const logout = () => client.post('/api/auth/logout');
