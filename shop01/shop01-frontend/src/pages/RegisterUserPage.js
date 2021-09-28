import React from 'react';
import Background from '../components/common/Background';
import AuthTemplate from '../components/auth/AuthTemplate';
import RegisterUserFormContainer from '../containers/auth/RegisterUserFormContainer';

const RegisterUserPage = () => {
  return (
    <Background>
      <AuthTemplate heading="회원가입">
        <RegisterUserFormContainer />
      </AuthTemplate>
    </Background>
  );
};

export default RegisterUserPage;
