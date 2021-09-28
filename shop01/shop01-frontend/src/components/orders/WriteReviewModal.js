import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import StarRatingBoxContainer from '../../containers/orders/StarRatingBoxContainer';
import EditorContainer from '../../containers/orders/EditorContainer';
import Button from '../common/Button';

const Fullscreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
`;

const WriteReviewModalBlock = styled(Responsive)`
  padding: 1.5rem;
  border-radius: 4px;
  background: white;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.125);

  h2 {
    margin-top: 0;
    margin-bottom: 2rem;
  }

  .content {
    margin-bottom: 2rem;
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
  }
`;

const StyledButton = styled(Button)`
  height: 2rem;

  & + & {
    margin-left: 0.75rem;
  }
`;

const WriteReviewModal = ({ visible, onCancel, onConfirm }) => {
  if (!visible) return null;

  return (
    <Fullscreen>
      <WriteReviewModalBlock>
        <h2>상품 리뷰 작성</h2>
        <div className="content">
          <StarRatingBoxContainer />
          <EditorContainer />
        </div>
        <div className="buttons">
          <StyledButton onClick={onCancel}>취소</StyledButton>
          <StyledButton onClick={onConfirm}>작성</StyledButton>
        </div>
      </WriteReviewModalBlock>
    </Fullscreen>
  );
};

export default WriteReviewModal;
