import React from 'react';
import Background from '../components/common/Background';
import HeaderContainer from '../containers/common/HeaderContainer';
import ResponsiveBoxTemplate from '../components/common/ResponsiveBoxTemplate';
import OrderListContainer from '../containers/user/orders/OrderListContainer';

const OrderListPage = () => {
  return (
    <Background>
      <HeaderContainer />
      <ResponsiveBoxTemplate heading="주문 목록">
        <OrderListContainer />
      </ResponsiveBoxTemplate>
    </Background>
  );
};

export default OrderListPage;
