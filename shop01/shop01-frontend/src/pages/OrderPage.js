import React from 'react';
import Background from '../components/common/Background';
import HeaderContainer from '../containers/common/HeaderContainer';
import ResponsiveBoxTemplate from '../components/common/ResponsiveBoxTemplate';
import OrderViewerContainer from '../containers/user/order/OrderViewerContainer';

const OrderPage = () => {
  return (
    <Background>
      <HeaderContainer />
      <ResponsiveBoxTemplate heading="주문 결제">
        <OrderViewerContainer />
      </ResponsiveBoxTemplate>
    </Background>
  );
};

export default OrderPage;
