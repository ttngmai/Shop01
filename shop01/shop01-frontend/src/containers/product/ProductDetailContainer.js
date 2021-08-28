import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import ProductDetail from '../../components/product/ProductDetail';
import { initializeProduct, readProduct } from '../../modules/product';

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
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleMouseOver = (index) => {
    setActiveImageIndex(index);
  };

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
      activeImageIndex={activeImageIndex}
      error={error}
      onMouseOver={handleMouseOver}
    />
  );
};

export default withRouter(ProductDetailContainer);
