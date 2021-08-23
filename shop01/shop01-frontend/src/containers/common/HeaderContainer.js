import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/common/Header';
import { logout } from '../../modules/user';

const HeaderContainer = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({ user: user.user }));

  const handleLogout = () => {
    dispatch(logout());
  }

  return <Header user={user} onLogout={handleLogout} />;
};

export default HeaderContainer;