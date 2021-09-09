import React from 'react';
import Background from '../components/common/Background';
import HeaderContainer from '../containers/common/HeaderContainer';
import WhiteBoxTemplate from '../components/common/WhiteBoxTemplate';
import OrderSuccess from '../components/orders/OrderSuccess';

const OrderSuccessPage = () => {
  return (
    <Background>
      <HeaderContainer />
      <WhiteBoxTemplate heading="주문 성공">
        <OrderSuccess />
      </WhiteBoxTemplate>
    </Background>
  );
};

export default OrderSuccessPage;
