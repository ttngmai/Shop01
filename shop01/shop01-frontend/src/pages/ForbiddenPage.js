import React from 'react';
import Background from '../components/common/Background';
import HeaderContainer from '../containers/common/HeaderContainer';
import ResponsiveBoxTemplate from '../components/common/ResponsiveBoxTemplate';
import WhiteBox from '../components/common/WhiteBox';

const ForbiddenPage = () => {
  return (
    <Background>
      <HeaderContainer />
      <ResponsiveBoxTemplate heading="접근 권한 없음">
        <WhiteBox>접근 권한이 없습니다.</WhiteBox>
      </ResponsiveBoxTemplate>
    </Background>
  );
};

export default ForbiddenPage;
