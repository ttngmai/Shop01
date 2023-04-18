import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import { listProducts } from '../../../modules/products';
import ManageProductListBox from '../../../components/admin/products/ManageProductListBox';

const ManageProductListBoxContainer = ({ location }) => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(({ products, loading }) => ({
    products: products.products,
    loading: loading['products/LIST_PRODUCTS'],
    error: products.error,
  }));

  useEffect(() => {
    const { category, name, page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    dispatch(listProducts({ category, name, page, type: 'admin' }));
  }, [dispatch, location.search]);

  return (
    <ManageProductListBox products={products} loading={loading} error={error} />
  );
};

export default withRouter(ManageProductListBoxContainer);
