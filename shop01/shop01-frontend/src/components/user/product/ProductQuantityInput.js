import React from 'react';
import { VscRemove, VscAdd } from 'react-icons/vsc';
import styled from 'styled-components';
import palette from '../../../lib/styles/palette';

const ProductQuantityInputBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 120px;
  border: 1px solid ${palette.gray[3]};
  border-radius: 4px;
  overflow: hidden;
`;

const QuantityButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  background-color: white;
  cursor: pointer;

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

const QuantityMinusButton = styled(QuantityButton)``;

const QuantityPlusButton = styled(QuantityButton)``;

const StyledInput = styled.input`
  width: calc(100% - 4rem);
  height: 2rem;
  padding: 0.25rem;
  text-align: center;
  line-height: 1.2rem;
  font-size: 1rem;
`;

const ProductQuantityInput = ({
  product,
  onDecreaseButtonClick,
  onIncreaseButtonClick,
  onChange,
}) => {
  return (
    <ProductQuantityInputBlock>
      <QuantityMinusButton type="button" onClick={onDecreaseButtonClick}>
        <VscRemove />
      </QuantityMinusButton>
      <StyledInput
        type="text"
        autoComplete="off"
        value={product.quantity}
        onChange={onChange}
      />
      <QuantityPlusButton type="button" onClick={onIncreaseButtonClick}>
        <VscAdd />
      </QuantityPlusButton>
    </ProductQuantityInputBlock>
  );
};

export default ProductQuantityInput;
