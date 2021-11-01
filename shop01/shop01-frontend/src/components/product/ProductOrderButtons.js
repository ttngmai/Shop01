import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import { BiCart, BiDollarCircle } from 'react-icons/bi';

const ProductOrderButtonsBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddToCartButton = styled(Button)`
  margin-right: 0.5rem;
`;

const OrderButton = styled(Button)``;

const ProductOrderButtons = ({
  onAddToCartButtonClick,
  onOrderButtonClick,
}) => {
  return (
    <ProductOrderButtonsBlock>
      <AddToCartButton
        type="button"
        onClick={onAddToCartButtonClick}
        size="large"
        fullWidth
      >
        <BiCart size="1.5rem" />
        담기
      </AddToCartButton>
      <OrderButton
        type="button"
        onClick={onOrderButtonClick}
        size="large"
        fullWidth
      >
        <BiDollarCircle size="1.5rem" />
        주문
      </OrderButton>
    </ProductOrderButtonsBlock>
  );
};

export default ProductOrderButtons;
