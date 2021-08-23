import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';
import { initializeForm, changeField, login } from '../../modules/auth';
import { check } from '../../modules/user';

const LoginForm = ({ history }) => {
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    dispatch(
      changeField({
        form: 'login',
        key: name,
        value,
      }),
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = form;
    
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      setError('로그인 실패');
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
      type="login"
      form={form}
      error={error}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export default withRouter(LoginForm);
