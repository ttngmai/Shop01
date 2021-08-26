import React from 'react';
import Background from '../components/common/Background';
import HeaderContainer from '../containers/common/HeaderContainer';
import WhiteBoxTemplate from '../components/common/WhiteBoxTemplate';
import OrderListContainer from '../containers/orders/OrderListContainer';

const OrderListPage = () => {
  return (
    <Background>
      <HeaderContainer />
      <WhiteBoxTemplate heading="주문 목록">
        <OrderListContainer />
      </WhiteBoxTemplate>
    </Background>
  );
};

export default OrderListPage;
