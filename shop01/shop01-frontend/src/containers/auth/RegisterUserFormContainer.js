import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RegisterUserForm from '../../components/auth/RegisterUserForm';
import { initializeForm, register } from '../../modules/auth';
import { check } from '../../modules/user';

const RegisterUserFormContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { auth, authError, user } = useSelector(({ auth, user }) => ({
    auth: auth.auth,
    authError: auth.error,
    user: user.user,
  }));

  const [error, setError] = useState(null);

  const handleSubmit = useCallback(
    (data) => {
      delete data.confirmPassword;

      console.log('폼 제출!!');
      console.log(data);

      dispatch(register(data));
    },
    [dispatch],
  );

  useEffect(() => {
    return () => dispatch(initializeForm());
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      if (authError.response.status === 409) {
        setError('이미 가입된 이메일입니다.');
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

  return <RegisterUserForm error={error} onSubmit={handleSubmit} />;
};

export default withRouter(RegisterUserFormContainer);
