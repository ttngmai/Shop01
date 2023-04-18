import React from 'react';
import Background from '../components/common/Background';
import AdminHeaderContainer from '../containers/common/AdminHeaderContainer';
import ResponsiveBoxTemplate from '../components/common/ResponsiveBoxTemplate';
import AdminMain from '../components/admin/dashboard/AdminMain';

const AdminMainPage = () => {
  return (
    <Background>
      <AdminHeaderContainer />
      <ResponsiveBoxTemplate heading="관리자 메인">
        <AdminMain />
      </ResponsiveBoxTemplate>
    </Background>
  );
};

export default AdminMainPage;
