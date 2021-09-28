import React from 'react';
import Background from '../components/common/Background';
import AuthTemplate from '../components/auth/AuthTemplate';
import LoginFormContainer from '../containers/auth/LoginFormContainer';

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
