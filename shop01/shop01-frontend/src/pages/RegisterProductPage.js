import React from 'react';
import Background from '../components/common/Background';
import AdminHeaderContainer from '../containers/common/AdminHeaderContainer';
import ResponsiveBoxTemplate from '../components/common/ResponsiveBoxTemplate';
import RegisterProductFormContainer from '../containers/admin/product/RegisterProductFormContainer';

const RegisterProductPage = () => {
  return (
    <Background>
      <AdminHeaderContainer />
      <ResponsiveBoxTemplate heading="상품 등록">
        <RegisterProductFormContainer />
      </ResponsiveBoxTemplate>
    </Background>
  );
};

export default RegisterProductPage;
