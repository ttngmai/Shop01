import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Cart from '../../../components/user/cart/Cart';
import { initializeCart, readCart } from '../../../modules/cart';
import {
  initializeShippingAddresses,
  listShippingAddresses,
} from '../../../modules/shippingAddresses';
import {
  initializeForm,
  readShippingAddress,
} from '../../../modules/shippingAddress';

const CartContainer = () => {
  const dispatch = useDispatch();
  const { cart, totalAmount, loading, error } = useSelector(
    ({ cart, loading }) => ({
      cart: cart.cart,
      totalAmount: cart.totalAmount,
      loading: loading['cart/READ_CART'],
      error: cart.error,
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(readCart());
    dispatch(listShippingAddresses());
    dispatch(readShippingAddress());

    return () => {
      dispatch(initializeCart());
      dispatch(initializeForm('read'));
      dispatch(initializeShippingAddresses());
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
