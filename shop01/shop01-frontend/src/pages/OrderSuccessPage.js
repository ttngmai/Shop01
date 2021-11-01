import React from 'react';
import Background from '../components/common/Background';
import HeaderContainer from '../containers/common/HeaderContainer';
import ResponsiveBoxTemplate from '../components/common/ResponsiveBoxTemplate';
import OrderSuccess from '../components/orders/OrderSuccess';

const OrderSuccessPage = () => {
  return (
    <Background>
      <HeaderContainer />
      <ResponsiveBoxTemplate heading="주문 성공">
        <OrderSuccess />
      </ResponsiveBoxTemplate>
    </Background>
  );
};

export default OrderSuccessPage;
