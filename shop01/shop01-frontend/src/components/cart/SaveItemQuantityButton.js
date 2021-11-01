import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const StyledButton = styled(Button)`
  max-width: 100px;
  margin-top: 0.5rem;
`;

const SaveItemQuantityButton = ({ onClick }) => {
  return (
    <StyledButton onClick={onClick} size="small" fullWidth>
      저장
    </StyledButton>
  );
};

export default SaveItemQuantityButton;
