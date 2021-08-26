import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderList from '../../components/orders/OrderList';
import { listOrders } from '../../modules/orders';
import { refund } from '../../lib/api/orders';

const OrderListContainer = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector(({ orders, loading }) => ({
    orders: orders.orders,
    loading: loading['orders/LIST_ORDERS'],
    error: orders.error,
  }));

  const handleRefundButtonClick = (merchant_uid) => {
    refund(merchant_uid);
  };

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

  return (
    <OrderList
      orders={orders}
      loading={loading}
      error={error}
      onRefundButtonClick={handleRefundButtonClick}
    />
  );
};

export default OrderListContainer;
