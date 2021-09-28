import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const StyledButton = styled(Button)`
  width: 100%;
  max-width: 120px;
`;

const WriteReviewButton = ({ onClick }) => {
  return (
    <StyledButton type="button" onClick={onClick}>
      리뷰 작성
    </StyledButton>
  );
};

export default WriteReviewButton;
