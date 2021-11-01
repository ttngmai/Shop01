import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { readStarRating } from '../../modules/reviews';
import StarRatingChart from '../../components/product/StarRatingChart';

const StarRatingChartContainer = ({ match }) => {
  const { productId } = match.params;

  const dispatch = useDispatch();
  const { starRatingChart, loading, error } = useSelector(
    ({ reviews, loading }) => ({
      starRatingChart: reviews.starRatingChart,
      loading: loading['reviews/READ_STAR_RATING'],
      error: reviews.error,
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(readStarRating({ product: productId }));
  }, [productId, dispatch]);

  return (
    <StarRatingChart
      starRatingChart={starRatingChart}
      loading={loading}
      error={error}
    />
  );
};

export default withRouter(StarRatingChartContainer);
