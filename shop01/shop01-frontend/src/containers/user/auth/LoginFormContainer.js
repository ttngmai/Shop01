import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoginForm from '../../../components/user/auth/LoginForm';
import { initializeForm, login } from '../../../modules/auth';
import { check } from '../../../modules/user';

const LoginFormContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { auth, authError, user } = useSelector(({ auth, user }) => ({
    auth: auth.auth,
    authError: auth.error,
    user: user.user,
  }));

  const [error, setError] = useState(null);

  const handleSubmit = useCallback(
    (data) => {
      const { email, password } = data;

      dispatch(login({ email, password }));
    },
    [dispatch],
  );

  useEffect(() => {
    return () => dispatch(initializeForm());
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

  return <LoginForm error={error} onSubmit={handleSubmit} />;
};

export default withRouter(LoginFormContainer);
