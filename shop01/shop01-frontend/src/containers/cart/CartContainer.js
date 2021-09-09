import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from '../../components/cart/Cart';
import { initializeCart, readCart } from '../../modules/cart';

const CartContainer = () => {
  const dispatch = useDispatch();
  const { cart, totalAmount, loading, error } = useSelector(
    ({ cart, loading }) => ({
      cart: cart.cart,
      totalAmount: cart.totalAmount,
      loading: loading['cart/READ_CART'],
      error: cart.error,
    }),
  );

  useEffect(() => {
    dispatch(readCart());

    return () => {
      dispatch(initializeCart());
    };
  }, [dispatch]);

  return (
    <Cart
      cart={cart}
      totalAmount={totalAmount}
      loading={loading}
      error={error}
    />
  );
};

export default CartContainer;
