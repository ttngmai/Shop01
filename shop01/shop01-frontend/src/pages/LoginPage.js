import React from 'react';
import Background from '../components/common/Background';
import AuthTemplate from '../components/user/auth/AuthTemplate';
import LoginFormContainer from '../containers/user/auth/LoginFormContainer';

const LoginPage = () => {
  return (
    <Background>
      <AuthTemplate heading="로그인">
        <LoginFormContainer />
      </AuthTemplate>
    </Background>
  );
};

export default LoginPage;
