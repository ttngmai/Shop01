import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { initializeProduct, readProduct } from '../../../modules/product';
import ProductDetail from '../../../components/user/product/ProductDetail';

const ProductDetailContainer = ({ match }) => {
  const dispatch = useDispatch();
  const { product, totalAmount, loading, error } = useSelector(
    ({ product, loading }) => ({
      product: product.read.product,
      totalAmount: product.read.totalAmount,
      loading: loading['product/READ_PRODUCT'],
      error: product.error,
    }),
  );

  const { productId } = match.params;

  useEffect(() => {
    dispatch(readProduct(productId));

    return () => {
      dispatch(initializeProduct());
    };
  }, [dispatch, productId]);

  return (
    <ProductDetail
      product={product}
      totalAmount={totalAmount}
      loading={loading}
      error={error}
    />
  );
};

export default withRouter(ProductDetailContainer);
