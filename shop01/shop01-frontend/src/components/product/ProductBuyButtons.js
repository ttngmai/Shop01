import React from 'react';
import styled from 'styled-components';
import { BiCart, BiDollarCircle } from 'react-icons/bi';
import palette from '../../lib/styles/palette';

const ProductBuyButtonsBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
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

  & .icon {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
  }
`;

const AddToCartButton = styled(Button)``;

const BuyButton = styled(Button)``;

const ProductBuyButtons = ({ onBuyButtonClick }) => {
  return (
    <ProductBuyButtonsBlock>
      <AddToCartButton type="button">
        <BiCart className="icon" />
        담기
      </AddToCartButton>
      <BuyButton type="button" onClick={onBuyButtonClick}>
        <BiDollarCircle className="icon" />
        구매
      </BuyButton>
    </ProductBuyButtonsBlock>
  );
};

export default ProductBuyButtons;
