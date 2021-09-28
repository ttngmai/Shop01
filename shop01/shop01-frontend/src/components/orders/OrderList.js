import React from 'react';
import styled from 'styled-components';
import { IoAlertCircleSharp } from 'react-icons/io5';
import addComma from '../../lib/addComma';
import palette from '../../lib/styles/palette';
import ProductRefundButtonContainer from '../../containers/orders/ProductRefundButtonContainer';
import WriteReviewButtonContainer from '../../containers/orders/WriteReviewButtonContainer';

const OrderListBlock = styled.div``;

const EmptyOrderList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
  padding-bottom: 2rem;
  border-top: 1px solid ${palette.gray[3]};
  border-bottom: 1px solid ${palette.gray[3]};

  svg {
    width: 3rem;
    height: 3rem;
    margin-bottom: 1rem;
  }
`;

const OrderDetailListBlock = styled.li`
  padding-bottom: 2rem;
`;

const OrderDate = styled.div`
  padding-bottom: 0.5rem;
`;

const OrderDetailItemBlock = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 15% 70% 15%;
  padding: 1rem 0;
  border-bottom: 1px solid ${palette.gray[3]};

  &:nth-child(2) {
    border-top: 1px solid ${palette.gray[3]};
  }
`;

const ProductImageBox = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 75%;

  & > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: ${palette.gray[1]};
  }
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TotalAmount = styled.div`
  padding: 1rem 0;

  .total-amount {
    font-weight: 400;
  }

  .total-amount-label {
    margin-right: 0.5rem;
    font-size: 1rem;
  }

  .num {
    margin-right: 0.2rem;
    vertical-align: -1px;
    font-style: normal;
    font-size: 1.5rem;
    font-weight: 700;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1rem;

  p {
    padding-bottom: 0.5rem;
  }

  .num {
    margin-right: 0.1rem;
    font-style: normal;
    font-weight: 700;
  }

  .product-quantity {
    color: ${palette.gray[5]};
  }
`;

const OrderDetailItem = ({ orderDetail }) => {
  return (
    <OrderDetailItemBlock>
      <ProductImageBox>
        <img src={`/images/${orderDetail.image}`} alt={orderDetail.name} />
      </ProductImageBox>
      <ProductInfo>
        <p>
          {orderDetail.name}
          <span className="product-quantity"> ({orderDetail.quantity}개)</span>
        </p>
        <p>
          <em className="num">
            {addComma(orderDetail.price * orderDetail.quantity)}
          </em>
          원
        </p>
      </ProductInfo>
      <WriteReviewButtonContainer productId={orderDetail.product_id} />
    </OrderDetailItemBlock>
  );
};

const OrderDetailList = ({ order }) => {
  return (
    <OrderDetailListBlock>
      <OrderDate>{order.created_at}</OrderDate>
      {order.OrderDetails.map((orderDetail) => (
        <OrderDetailItem key={orderDetail.id} orderDetail={orderDetail} />
      ))}
      <FlexBox>
        <ProductRefundButtonContainer
          merchant_uid={order.merchant_uid}
          reason="테스트 환불"
          cancel_request_amount={order.amount}
        />
        <TotalAmount>
          <strong className="total-amount">
            <span className="total-amount-label">총 상품 금액:</span>
            <em className="num">{addComma(order.amount)}</em>원
          </strong>
        </TotalAmount>
      </FlexBox>
    </OrderDetailListBlock>
  );
};

const OrderList = ({ orders, loading, error }) => {
  if (error) {
    return <OrderListBlock>에러가 발생했습니다.</OrderListBlock>;
  }

  if (loading || !orders) {
    return null;
  }

  if (orders.length === 0) {
    return (
      <OrderListBlock>
        <EmptyOrderList>
          <IoAlertCircleSharp />
          <p>주문 목록이 없습니다.</p>
        </EmptyOrderList>
      </OrderListBlock>
    );
  }

  return (
    <OrderListBlock>
      {orders.map((order) => (
        <OrderDetailList key={order.id} order={order} />
      ))}
    </OrderListBlock>
  );
};

export default OrderList;
