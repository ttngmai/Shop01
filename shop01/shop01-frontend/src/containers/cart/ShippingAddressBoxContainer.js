import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import ShippingAddressBox from '../../components/cart/ShippingAddressBox';

const ShippingAddressBoxContainer = () => {
  const { shippingAddress } = useSelector(
    ({ shippingAddress }) => ({
      shippingAddress: shippingAddress.read.shippingAddress,
    }),
    shallowEqual,
  );

  return <ShippingAddressBox shippingAddress={shippingAddress} />;
};

export default ShippingAddressBoxContainer;
