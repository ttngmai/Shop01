import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const StyledButton = styled(Button)``;

const SearchShippingAddressButton = ({ onClick }) => {
  return (
    <StyledButton type="button" onClick={onClick}>
      배송지 등록
    </StyledButton>
  );
};

export default SearchShippingAddressButton;
