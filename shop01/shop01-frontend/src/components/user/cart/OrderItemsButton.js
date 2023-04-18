import React from 'react';
import styled from 'styled-components';
import { Tablet } from '../../../lib/styles/deviceLayout';
import Button from '../../common/Button';
import { BiDollarCircle } from 'react-icons/bi';
import addComma from '../../../lib/util/addComma';

const StyledButton = styled(Button)`
  .num {
    margin-right: 0.1rem;
    font-style: normal;
    font-weight: 700;
  }
`;

const OrderItemsButton = ({ amount, onClick }) => {
  if (!amount || amount === 0) {
    return (
      <StyledButton onClick={onClick} size="large" disabled fullWidth>
        <BiDollarCircle size="1.5rem" />
        상품을 선택해 주세요.
      </StyledButton>
    );
  }

  return (
    <StyledButton onClick={onClick} size="large" fullWidth>
      <BiDollarCircle size="1.5rem" />
      <Tablet>
        <em className="num">{addComma(amount)}</em>원
      </Tablet>{' '}
      주문
    </StyledButton>
  );
};

export default OrderItemsButton;
