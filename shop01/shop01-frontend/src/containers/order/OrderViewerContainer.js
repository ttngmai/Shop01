import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  initializeShippingAddresses,
  listShippingAddresses,
} from '../../modules/shippingAddresses';
import {
  initializeForm,
  readShippingAddress,
} from '../../modules/shippingAddress';
import OrderViewer from '../../components/order/OrderViewer';

const OrderViewerContainer = ({ location }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listShippingAddresses());
    dispatch(readShippingAddress());

    return () => {
      dispatch(initializeForm('read'));
      dispatch(initializeShippingAddresses());
    };
  }, [dispatch]);

  if (!location.state) {
    return null;
  }

  const { product, amount } = location.state;

  return <OrderViewer product={product} amount={amount} />;
};

export default withRouter(OrderViewerContainer);
