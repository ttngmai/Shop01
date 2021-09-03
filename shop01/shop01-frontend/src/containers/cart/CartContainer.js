import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from '../../components/cart/Cart';
import { readCart } from '../../modules/cart';

const CartContainer = () => {
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector(({ cart, loading }) => ({
    cart: cart.cart,
    loading: loading['cart/READ_CART'],
    error: cart.error,
  }));

  useEffect(() => {
    dispatch(readCart());
  }, [dispatch]);

  return <Cart cart={cart} loading={loading} error={error} />;
};

export default CartContainer;
