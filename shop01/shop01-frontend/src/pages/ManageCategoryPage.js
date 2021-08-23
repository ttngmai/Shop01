import React from 'react';
import Background from '../components/common/Background';
import HeaderContainer from '../containers/common/HeaderContainer';
import RegisterProductTemplate from '../components/product/RegisterProductTemplate';
import ManageCategoryBoxContainer from '../containers/categories/ManageCategoryBoxContainer';

const ManageCategoryPage = () => {
  return (
    <Background>
      <HeaderContainer />
      <RegisterProductTemplate>
        <ManageCategoryBoxContainer />
      </RegisterProductTemplate>
    </Background>
  )
};

export default ManageCategoryPage;
