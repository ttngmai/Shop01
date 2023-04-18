import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import qs from 'qs';
import Pagination from '../../../components/common/Pagination';

const PaginationContainer = ({ location }) => {
  const { products, loading, totalPage } = useSelector(
    ({ products, loading }) => ({
      products: products.products,
      loading: loading['products/LIST_PRODUCTS'],
      totalPage: products.totalPage,
    }),
  );

  if (!products || loading) return null;

  const {
    category,
    name,
    page = 1,
  } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const buildLink = ({ category, name, page }) => {
    const query = qs.stringify({ category, name, page });
    return `/product-list/manage?${query}`;
  };

  return (
    <Pagination
      category={category}
      name={name}
      page={parseInt(page, 10)}
      totalPage={totalPage}
      buildLink={buildLink}
    />
  );
};

export default withRouter(PaginationContainer);
