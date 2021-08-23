import React from 'react';
import Background from '../components/common/Background';
import AuthTemplate from '../components/auth/AuthTemplate';
import LoginForm from '../containers/auth/LoginForm';

const LoginPage = () => {
  return (
    <Background>
      <AuthTemplate>
        <LoginForm />
      </AuthTemplate>
    </Background>
  );
};

export default LoginPage;
