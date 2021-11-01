import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  initializeShippingAddresses,
  listShippingAddresses,
} from '../../modules/shippingAddresses';
import ShippingAddressList from '../../components/user/ShippingAddressList';

const ShippingAddressListContainer = () => {
  const dispatch = useDispatch();
  const { shippingAddresses, error } = useSelector(({ shippingAddresses }) => ({
    shippingAddresses: shippingAddresses.shippingAddresses,
    error: shippingAddresses.error,
  }));

  useEffect(() => {
    dispatch(listShippingAddresses());

    return () => {
      dispatch(initializeShippingAddresses());
    };
  }, [dispatch]);

  return (
    <ShippingAddressList shippingAddresses={shippingAddresses} error={error} />
  );
};

export default ShippingAddressListContainer;
