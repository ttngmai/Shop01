import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const StyledButton = styled(Button)`
  width: 100%;
  max-width: 120px;
  padding: 0;
  margin-top: 0.5rem;
`;

const ItemQuantitySaveButton = ({ onClick }) => {
  return <StyledButton onClick={onClick}>저장</StyledButton>;
};

export default ItemQuantitySaveButton;
