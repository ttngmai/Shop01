import React from 'react';
import styled, { css } from 'styled-components';
import { BiCart, BiDollarCircle } from 'react-icons/bi';
import palette from '../../lib/styles/palette';

const ProductOrderButtonsBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const buttonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 49%;
  height: 3.5rem;
  border: 1px solid ${palette.indigo[7]};
  border-radius: 4px;
  background-color: white;
  font-size: 1.25rem;
  color: ${palette.indigo[7]};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${palette.indigo[7]};
    color: white;
    box-shadow: 0px 2px 8px #4c72ff;
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
  }
`;

const AddToCartButton = styled.button`
  ${buttonStyle}
`;

const OrderButton = styled.button`
  ${buttonStyle}
`;

const ProductOrderButtons = ({
  onAddToCartButtonClick,
  onOrderButtonClick,
}) => {
  return (
    <ProductOrderButtonsBlock>
      <AddToCartButton type="button" onClick={onAddToCartButtonClick}>
        <BiCart />
        담기
      </AddToCartButton>
      <OrderButton type="button" onClick={onOrderButtonClick}>
        <BiDollarCircle />
        주문
      </OrderButton>
    </ProductOrderButtonsBlock>
  );
};

export default ProductOrderButtons;
