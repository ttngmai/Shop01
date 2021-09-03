import React from 'react';
import Background from '../components/common/Background';
import HeaderContainer from '../containers/common/HeaderContainer';
import WhiteBoxTemplate from '../components/common/WhiteBoxTemplate';
import CartContainer from '../containers/cart/CartContainer';

const CartPage = () => {
  return (
    <Background>
      <HeaderContainer />
      <WhiteBoxTemplate heading="장바구니">
        <CartContainer />
      </WhiteBoxTemplate>
    </Background>
  );
};

export default CartPage;