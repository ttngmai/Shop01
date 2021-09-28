import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { writeReview } from '../../modules/review';
import WriteReviewButton from '../../components/orders/WriteReviewButton';
import ModalPortal from '../../lib/ModalPortal';
import WriteReviewModal from '../../components/orders/WriteReviewModal';

const WriteReviewButtonContainer = ({ productId }) => {
  const dispatch = useDispatch();
  const { starRating, text, review, error } = useSelector(({ review }) => ({
    starRating: review.starRating,
    text: review.text,
    review: review.review,
    error: review.error,
  }));

  const [writeReviewModal, setWriteReviewModal] = useState(false);

  const handleClick = () => {
    setWriteReviewModal(true);
  };

  const handleCancelButtonClick = () => {
    setWriteReviewModal(false);
  };

  const handleConfirmButtonClick = () => {
    dispatch(
      writeReview({ star_rating: starRating, text, product_id: productId }),
    );
  };

  useEffect(() => {
    if (review) {
      setWriteReviewModal(false);
    }

    if (error) {
      setWriteReviewModal(false);
      console.log(error);
    }
  }, [review, error]);

  return (
    <>
      <WriteReviewButton onClick={handleClick} />
      <ModalPortal>
        <WriteReviewModal
          visible={writeReviewModal}
          onCancel={handleCancelButtonClick}
          onConfirm={handleConfirmButtonClick}
        />
      </ModalPortal>
    </>
  );
};

export default WriteReviewButtonContainer;
