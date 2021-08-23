import React from 'react';
import Background from '../components/common/Background';
import AuthTemplate from '../components/auth/AuthTemplate';
import RegisterUserForm from '../containers/auth/RegisterUserForm';

const RegisterUserPage = () => {
  return (
    <Background>
      <AuthTemplate>
        <RegisterUserForm />
      </AuthTemplate>
    </Background>
  );
};

export default RegisterUserPage;
