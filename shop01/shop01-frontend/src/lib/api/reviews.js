import client from './client';
import qs from 'qs';

export const writeReview = (data) => client.post('/api/reviews', data);

export const listReviews = ({ product, page }) => {
  const queryString = qs.stringify({
    product,
    page,
  });
  return client.get(`/api/reviews?${queryString}`);
};

export const readStarRating = ({ product }) => {
  const queryString = qs.stringify({ product });
  return client.get(`/api/reviews/star-rating?${queryString}`);
};

export const readReview = (id) => client.get(`/api/reviews/${id}`);
