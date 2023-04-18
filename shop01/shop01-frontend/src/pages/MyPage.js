import React from 'react';
import Background from '../components/common/Background';
import HeaderContainer from '../containers/common/HeaderContainer';
import ResponsiveBoxTemplate from '../components/common/ResponsiveBoxTemplate';
import UserProfileContainer from '../containers/user/user/UserProfileContainer';
import UserShippingAddresses from '../components/user/user/UserShippingAddresses';

const MyPage = () => {
  return (
    <Background>
      <HeaderContainer />
      <ResponsiveBoxTemplate heading="마이 페이지">
        <UserProfileContainer />
        <UserShippingAddresses />
      </ResponsiveBoxTemplate>
    </Background>
  );
};

export default MyPage;
