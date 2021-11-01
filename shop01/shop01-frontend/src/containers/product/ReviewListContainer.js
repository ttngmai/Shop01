import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { initializeReviews, listReviews } from '../../modules/reviews';
import ReviewList from '../../components/product/ReviewList';

const ReivewListContainer = ({ match }) => {
  const { productId } = match.params;

  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector(
    ({ reviews, loading }) => ({
      reviews: reviews.reviews,
      loading: loading['reviews/LIST_REVIEWS'],
      error: reviews.error,
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(listReviews({ product: productId }));

    return () => {
      dispatch(initializeReviews());
    };
  }, [productId, dispatch]);

  return <ReviewList reviews={reviews} loading={loading} error={error} />;
};

export default withRouter(ReivewListContainer);
