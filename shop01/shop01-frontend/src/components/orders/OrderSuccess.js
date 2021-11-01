import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import WhiteBox from '../common/WhiteBox';
import Button from '../common/Button';
import { IoHappyOutline } from 'react-icons/io5';
import addComma from '../../lib/addComma';

const OrderSuccessBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  border-top: 1px solid ${palette.gray[5]};
  border-bottom: 1px solid ${palette.gray[5]};

  svg {
    width: 3rem;
    height: 3rem;
    margin-bottom: 1rem;
  }
`;

const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 1rem 0;
`;

const OrderSuccess = () => {
  const location = useLocation();

  if (!location.state) {
    return null;
  }

  return (
    <WhiteBox>
      <OrderSuccessBlock>
        <IoHappyOutline />
        <p>주문이 성공적으로 완료되었습니다.</p>
        <OrderInfo>
          <p>상품명: {location.state.name}</p>
          <p>상품 금액: {addComma(location.state.amount)}원</p>
        </OrderInfo>
        <Button to={'/user/order-list'}>주문 목록</Button>
      </OrderSuccessBlock>
    </WhiteBox>
  );
};

export default OrderSuccess;
