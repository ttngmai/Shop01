import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import ProductList from '../../components/products/ProductList';
import { listProducts } from '../../modules/products';

const ProductListContainer = ({ location, match }) => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(({ products, loading }) => ({
    products: products.products,
    loading: loading['products/LIST_PRODUCTS'],
    error: products.error,
  }));

  useEffect(() => {
    const { category } = match.params;
    const { name, page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    dispatch(listProducts({ category, name, page }));
  }, [dispatch, match.params, location.search]);

  return <ProductList products={products} loading={loading} error={error} />;
};

export default withRouter(ProductListContainer);
