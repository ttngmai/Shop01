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
  display: grid;
  grid-template-columns: 25% 50% 25%;
  border: 1px solid ${palette.gray[5]};

  figure {
    width: 100%;
    height: 0;
    padding-bottom: 70%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-color: lightgray;
  }
`;

const OrderItem = ({ order, onRefundButtonClick }) => {
  return (
    <OrderItemBlock>
      <p>merchant_uid: {order.merchant_uid}</p>
      {order.OrderDetails.map((orderDetail) => (
        <OrderDetailItemBlock key={orderDetail.id}>
          <figure
            className="product-image"
            style={{
              backgroundImage: `url('/images/${orderDetail.image}')`,
            }}
          />
          <div className="product-info">
            <p>상품명: {orderDetail.name}</p>
            <p>가격: {orderDetail.price}</p>
            <p>수량: {orderDetail.quantity}</p>
            <p>총 상품 금액: {order.amount}</p>
          </div>
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
