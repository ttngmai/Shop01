import React from 'react';
import Background from '../components/common/Background';
import AdminHeaderContainer from '../containers/common/AdminHeaderContainer';
import ResponsiveBoxTemplate from '../components/common/ResponsiveBoxTemplate';
import ManageCategoryBoxContainer from '../containers/admin/categories/ManageCategoryBoxContainer';

const ManageCategoriesPage = () => {
  return (
    <Background>
      <AdminHeaderContainer />
      <ResponsiveBoxTemplate heading="카테고리 관리">
        <ManageCategoryBoxContainer />
      </ResponsiveBoxTemplate>
    </Background>
  );
};

export default ManageCategoriesPage;
