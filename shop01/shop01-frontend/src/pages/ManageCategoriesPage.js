import React from 'react';
import Background from '../components/common/Background';
import HeaderContainer from '../containers/common/HeaderContainer';
import ResponsiveBoxTemplate from '../components/common/ResponsiveBoxTemplate';
import ManageCategoryBoxContainer from '../containers/categories/ManageCategoryBoxContainer';

const ManageCategoriesPage = () => {
  return (
    <Background>
      <HeaderContainer />
      <ResponsiveBoxTemplate heading="카테고리 관리">
        <ManageCategoryBoxContainer />
      </ResponsiveBoxTemplate>
    </Background>
  );
};

export default ManageCategoriesPage;
