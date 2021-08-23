import React from 'react';
import Background from '../components/common/Background';
import HeaderContainer from '../containers/common/HeaderContainer';
import RegisterProductTemplate from '../components/product/RegisterProductTemplate';
import RegisterProductFormContainer from '../containers/product/RegisterProductFormContainer';

const RegisterProductPage = () => {
  return (
    <Background>
      <HeaderContainer />
      <RegisterProductTemplate>
        <RegisterProductFormContainer />
      </RegisterProductTemplate>
    </Background>
  );
};

export default RegisterProductPage;