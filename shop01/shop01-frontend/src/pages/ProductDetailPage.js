import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import ProductDetailContainer from '../containers/product/ProductDetailContainer';
import ReviewListContainer from '../containers/product/ReviewListContainer';
import SeeMoreReviewListButtonContainer from '../containers/product/SeeMoreReviewListButtonContainer';
import Footer from '../components/common/Footer';

const ProductDetailPage = () => {
  return (
    <>
      <HeaderContainer />
      <ProductDetailContainer />
      <ReviewListContainer />
      <SeeMoreReviewListButtonContainer />
      <Footer />
    </>
  );
};

export default ProductDetailPage;
