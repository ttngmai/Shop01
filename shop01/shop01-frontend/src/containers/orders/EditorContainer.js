import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initializeReview } from '../../modules/review';
import Editor from '../../components/orders/Editor';

const EditContainer = () => {
  const dispatch = useDispatch();
  const { text } = useSelector(({ review }) => ({
    text: review.text,
  }));

  const handleChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch],
  );

  useEffect(() => {
    return () => {
      dispatch(initializeReview());
    };
  }, [dispatch]);

  return <Editor text={text} onChangeField={handleChangeField} />;
};

export default EditContainer;
