import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';

const OrderListBlock = styled.div`
  width: 100%;
  margin-top: 3rem;
`;

const OrderItemBlock = styled.li`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  border: 1px solid ${palette.gray[5]};
`;

const OrderDetailItemBlock = styled.div`
  border: 1px solid ${palette.gray[5]};
`;

const OrderItem = ({ order, onRefundButtonClick }) => {
  return (
    <OrderItemBlock>
      <p>merchant_uid: {order.merchant_uid}</p>
      {order.OrderDetails.map((orderDetail) => (
        <OrderDetailItemBlock key={orderDetail.id}>
          <p>상품명: {orderDetail.name}</p>
          <p>가격: {orderDetail.price}</p>
          <p>수량: {orderDetail.count}</p>
        </OrderDetailItemBlock>
      ))}
      <Button
        type="button"
        onClick={() => onRefundButtonClick(order.merchant_uid)}
      >
        환불
      </Button>
    </OrderItemBlock>
  );
};

const OrderList = ({ orders, loading, error, onRefundButtonClick }) => {
  if (error) {
    return <OrderListBlock>에러가 발생했습니다.</OrderListBlock>;
  }

  return (
    <OrderListBlock>
      {!loading &&
        orders &&
        orders.map((order) => (
          <OrderItem
            key={order.id}
            order={order}
            onRefundButtonClick={(merchant_uid) =>
              onRefundButtonClick(merchant_uid)
            }
          />
        ))}
    </OrderListBlock>
  );
};

export default OrderList;
