import React from 'react';
import Button from '../../common/Button';
import { BiDollarCircle } from 'react-icons/bi';

const OrderProductButton = ({ onClick }) => {
  return (
    <Button type="button" size="large" onClick={onClick} fullWidth>
      <BiDollarCircle size="1.5rem" />
      주문
    </Button>
  );
};

export default OrderProductButton;
