import React from 'react';
import { VscRemove, VscAdd } from 'react-icons/vsc';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const ItemQuantityInputBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100px;
  border: 1px solid ${palette.gray[3]};
  border-radius: 4px;
  overflow: hidden;
`;

const QuantityButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  background-color: white;
  cursor: pointer;
`;

const QuantityMinusButton = styled(QuantityButton)``;

const QuantityPlusButton = styled(QuantityButton)``;

const StyledInput = styled.input`
  width: 100%;
  height: 2rem;
  padding: 0.25rem;
  text-align: center;
  line-height: 1.2rem;
  font-size: 0.825rem;
  font-weight: 700;
`;

const ItemQuantityInput = ({
  item,
  onDecreaseButtonClick,
  onIncreaseButtonClick,
  onChange,
}) => {
  return (
    <ItemQuantityInputBlock>
      <QuantityMinusButton type="button" onClick={onDecreaseButtonClick}>
        <VscRemove size="1rem" />
      </QuantityMinusButton>
      <StyledInput
        type="text"
        autoComplete="off"
        value={item.quantity}
        onChange={onChange}
      />
      <QuantityPlusButton type="button" onClick={onIncreaseButtonClick}>
        <VscAdd size="1rem" />
      </QuantityPlusButton>
    </ItemQuantityInputBlock>
  );
};

export default ItemQuantityInput;
