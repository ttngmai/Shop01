import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { listReviews } from '../../modules/reviews';
import SeeMoreReviewListButton from '../../components/product/SeeMoreReviewListButton';

const SeeMoreReviewListButtonContainer = ({ match }) => {
  const { productId } = match.params;

  const dispatch = useDispatch();
  const { totalPage } = useSelector(({ reviews }) => ({
    totalPage: reviews.totalPage,
  }));

  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = () => {
    dispatch(listReviews({ product: productId, page: currentPage + 1 }));
    setCurrentPage(currentPage + 1);
  };

  return (
    <SeeMoreReviewListButton
      currentPage={currentPage}
      totalPage={totalPage}
      onClick={handleClick}
    />
  );
};

export default withRouter(SeeMoreReviewListButtonContainer);
