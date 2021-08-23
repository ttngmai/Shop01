import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';
import { initializeForm, changeField, register } from '../../modules/auth';
import { check } from '../../modules/user';

const RegisterUserForm = ({ history }) => {
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));
  
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    dispatch(
      changeField({
        form: 'register',
        key: name,
        value,
      }),
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password, passwordConfirm, nick } = form;

    if ([email, password, passwordConfirm, nick].includes('')) {
      setError('빈 칸을 모두 입력하세요.');
      return;
    }

    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      dispatch(changeField({ form: 'register', key: 'password', value: '' }));
      dispatch(
        changeField({ form: 'register', key: 'passwordConfirm', value: '' }),
      );
      return;
    }

    dispatch(register({ email, password, nick }));
  };

  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      if (authError.response.status === 409) {
        setError('이미 존재하는 계정명입니다.');
        return;
      }

      setError('회원가입 실패');
    } else {
      setError(null);
      
      if (auth) {
        dispatch(check());
      }
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [history, user]);

  return (
    <AuthForm
      type="register"
      form={form}
      error={error}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export default withRouter(RegisterUserForm);
