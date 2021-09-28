import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StarRatingBox from '../../components/orders/StarRatingBox';
import { changeField } from '../../modules/review';

const StarRatingBoxContainer = () => {
  const dispatch = useDispatch();
  const { starRating } = useSelector(({ review }) => ({
    starRating: review.starRating,
  }));

  const handleClick = (e, index) => {
    e.preventDefault();

    dispatch(changeField({ key: 'starRating', value: index + 1 }));
  };

  return <StarRatingBox starRating={starRating} onClick={handleClick} />;
};

export default StarRatingBoxContainer;
