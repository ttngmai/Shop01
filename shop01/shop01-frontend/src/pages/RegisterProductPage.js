import React from 'react';
import Background from '../components/common/Background';
import HeaderContainer from '../containers/common/HeaderContainer';
import ResponsiveBoxTemplate from '../components/common/ResponsiveBoxTemplate';
import RegisterProductFormContainer from '../containers/product/RegisterProductFormContainer';

const RegisterProductPage = () => {
  return (
    <Background>
      <HeaderContainer />
      <ResponsiveBoxTemplate heading="상품 등록">
        <RegisterProductFormContainer />
      </ResponsiveBoxTemplate>
    </Background>
  );
};

export default RegisterProductPage;
