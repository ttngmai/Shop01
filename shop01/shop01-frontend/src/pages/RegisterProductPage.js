import React from 'react';
import Background from '../components/common/Background';
import HeaderContainer from '../containers/common/HeaderContainer';
import WhiteBoxTemplate from '../components/common/WhiteBoxTemplate';
import RegisterProductFormContainer from '../containers/product/RegisterProductFormContainer';

const RegisterProductPage = () => {
  return (
    <Background>
      <HeaderContainer />
      <WhiteBoxTemplate heading="상품 등록">
        <RegisterProductFormContainer />
      </WhiteBoxTemplate>
    </Background>
  );
};

export default RegisterProductPage;
