import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import Header from '../../components/common/Header';
import { logout } from '../../modules/user';

const HeaderContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({ user: user.user }));

  const handleLogout = () => {
    dispatch(logout());
    history.push('/');
  };

  return <Header user={user} onLogout={handleLogout} />;
};

export default withRouter(HeaderContainer);
