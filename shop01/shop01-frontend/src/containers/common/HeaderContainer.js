import React, { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { withRouter } from 'react-router';
import { logout } from '../../modules/user';
import Header from '../../components/common/Header';

const HeaderContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(
    ({ user }) => ({ user: user.user }),
    shallowEqual,
  );

  const handleLogout = useCallback(() => {
    dispatch(logout());
    history.push('/');
  }, [history, dispatch]);

  return <Header user={user} onLogout={handleLogout} />;
};

export default withRouter(HeaderContainer);
