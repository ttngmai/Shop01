import React from 'react';
import Background from '../components/common/Background';
import HeaderContainer from '../containers/common/HeaderContainer';
import ResponsiveBoxTemplate from '../components/common/ResponsiveBoxTemplate';
import CartContainer from '../containers/cart/CartContainer';

const CartPage = () => {
  return (
    <Background>
      <HeaderContainer />
      <ResponsiveBoxTemplate heading="장바구니">
        <CartContainer />
      </ResponsiveBoxTemplate>
    </Background>
  );
};

export default CartPage;
