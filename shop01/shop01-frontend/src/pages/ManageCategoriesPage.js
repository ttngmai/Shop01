import React from 'react';
import Background from '../components/common/Background';
import HeaderContainer from '../containers/common/HeaderContainer';
import WhiteBoxTemplate from '../components/common/WhiteBoxTemplate';
import ManageCategoryBoxContainer from '../containers/categories/ManageCategoryBoxContainer';

const ManageCategoriesPage = () => {
  return (
    <Background>
      <HeaderContainer />
      <WhiteBoxTemplate heading="카테고리 관리">
        <ManageCategoryBoxContainer />
      </WhiteBoxTemplate>
    </Background>
  );
};

export default ManageCategoriesPage;
