import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import OrderList from '../../../components/user/orders/OrderList';
import { listOrders } from '../../../modules/orders';

const OrderListContainer = ({ location }) => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector(({ orders, loading }) => ({
    orders: orders.orders,
    loading: loading['orders/LIST_ORDERS'],
    error: orders.error,
  }));

  useEffect(() => {
    const { page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    dispatch(listOrders({ page }));
  }, [dispatch, location.search]);

  return <OrderList orders={orders} loading={loading} error={error} />;
};

export default withRouter(OrderListContainer);
