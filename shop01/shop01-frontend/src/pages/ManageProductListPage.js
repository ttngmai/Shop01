import React from 'react';
import Background from '../components/common/Background';
import AdminHeaderContainer from '../containers/common/AdminHeaderContainer';
import ResponsiveBoxTemplate from '../components/common/ResponsiveBoxTemplate';
import ManageProductListBoxContainer from '../containers/admin/products/ManageProductListBoxContainer';

const ManageProductsPage = () => {
  return (
    <Background>
      <AdminHeaderContainer />
      <ResponsiveBoxTemplate heading="상품 목록 관리">
        <ManageProductListBoxContainer />
      </ResponsiveBoxTemplate>
    </Background>
  );
};

export default ManageProductsPage;
