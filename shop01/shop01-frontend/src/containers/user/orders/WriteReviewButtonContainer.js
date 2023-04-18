import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { writeReview } from '../../../modules/review';
import WriteReviewButton from '../../../components/user/orders/WriteReviewButton';
import ModalPortal from '../../../lib/portal/ModalPortal';
import WriteReviewModal from '../../../components/user/orders/WriteReviewModal';

const WriteReviewButtonContainer = ({ productId }) => {
  const dispatch = useDispatch();
  const { starRating, text, review, error } = useSelector(({ review }) => ({
    starRating: review.starRating,
    text: review.text,
    review: review.review,
    error: review.error,
  }));

  const [modal, setModal] = useState(false);

  const handleClick = () => {
    setModal(true);
  };

  const handleCancelButtonClick = () => {
    setModal(false);
  };

  const handleConfirmButtonClick = () => {
    dispatch(
      writeReview({ star_rating: starRating, text, product_id: productId }),
    );
  };

  useEffect(() => {
    if (review) {
      setModal(false);
    }

    if (error) {
      setModal(false);
      console.log(error);
    }
  }, [review, error]);

  return (
    <>
      <WriteReviewButton onClick={handleClick} />
      <ModalPortal>
        {modal && (
          <WriteReviewModal
            onCancel={handleCancelButtonClick}
            onConfirm={handleConfirmButtonClick}
          />
        )}
      </ModalPortal>
    </>
  );
};

export default WriteReviewButtonContainer;
