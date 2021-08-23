import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import ProductListContainer from '../containers/products/ProductListContainer';
import PaginationContainer from '../containers/products/PaginationContainer';

const ProductListPage = () => {
  return (
    <>
      <HeaderContainer />
      <ProductListContainer />
      <PaginationContainer />
    </>
  );
};

export default ProductListPage;
