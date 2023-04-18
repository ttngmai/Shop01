import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import qs from 'qs';
import Pagination from '../../../components/common/Pagination';

const PaginationContainer = ({ location }) => {
  const { orders, loading, totalPage } = useSelector(({ orders, loading }) => ({
    orders: orders.orders,
    loading: loading['orders/LIST_ORDERS'],
    totalPage: orders.totalPage,
  }));

  if (!orders || loading) return null;

  const { page = 1 } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const buildLink = ({ page }) => {
    const query = qs.stringify({ page });
    return `/user/order-list?${query}`;
  };

  return (
    <Pagination
      page={parseInt(page, 10)}
      totalPage={totalPage}
      buildLink={buildLink}
    />
  );
};

export default withRouter(PaginationContainer);
