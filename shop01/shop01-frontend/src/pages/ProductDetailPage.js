import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import ProductDetailContainer from '../containers/user/product/ProductDetailContainer';
import ReviewListContainer from '../containers/user/product/ReviewListContainer';
import SeeMoreReviewListButtonContainer from '../containers/user/product/SeeMoreReviewListButtonContainer';
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
