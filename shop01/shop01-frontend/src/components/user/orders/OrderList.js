import React from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/palette';
import WhiteBox from '../../common/WhiteBox';
import RequestRefundButtonContainer from '../../../containers/user/orders/RequestRefundButtonContainer';
import WriteReviewButtonContainer from '../../../containers/user/orders/WriteReviewButtonContainer';
import PaginationContainer from '../../../containers/user/orders/PaginationContainer';
import { IoAlertCircleSharp } from 'react-icons/io5';
import addComma from '../../../lib/util/addComma';

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

const OrderDetailListBlock = styled.ul`
  padding-bottom: 2rem;
`;

const OrderDate = styled.div`
  padding-bottom: 0.5rem;
`;

const OrderDetailItemBlock = styled.li`
  display: grid;
  align-items: center;
  grid-template-columns: max-content 1fr max-content;
  padding: 1rem 0;
  border-bottom: 1px solid ${palette.gray[3]};

  &:nth-child(2) {
    border-top: 1px solid ${palette.gray[3]};
  }
`;

const ProductImageBox = styled.div`
  position: relative;
  width: 100px;
  height: 75px;
  border-radius: 9px;
  overflow: hidden;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: ${palette.gray[1]};
    transition: all 0.2s linear;
  }

  img:hover {
    transform: scale(1.05);
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
  padding: 0 2rem;

  p {
    padding-bottom: 0.5rem;
  }

  .num {
    margin-right: 0.1rem;
    font-style: normal;
    font-weight: 700;
  }

  .product-quantity {
    padding-left: 0.5rem;
    color: ${palette.gray[5]};
  }
`;

const PaginationBox = styled.div`
  padding-top: 3rem;
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
          <span className="product-quantity">
            ({orderDetail.quantity}개 구매)
          </span>
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
        <RequestRefundButtonContainer
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
  if (!orders || loading) {
    return null;
  }

  if (error) {
    return (
      <OrderListBlock>
        <WhiteBox>에러가 발생했습니다.</WhiteBox>
      </OrderListBlock>
    );
  }

  if (orders.length === 0) {
    return (
      <OrderListBlock>
        <WhiteBox>
          <EmptyOrderList>
            <IoAlertCircleSharp />
            <p>주문 목록이 없습니다.</p>
          </EmptyOrderList>
        </WhiteBox>
      </OrderListBlock>
    );
  }

  return (
    <OrderListBlock>
      <WhiteBox>
        {orders.map((order) => (
          <OrderDetailList key={order.id} order={order} />
        ))}
        <PaginationBox>
          <PaginationContainer />
        </PaginationBox>
      </WhiteBox>
    </OrderListBlock>
  );
};

export default OrderList;
