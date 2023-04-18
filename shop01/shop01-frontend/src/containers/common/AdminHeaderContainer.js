import React, { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { withRouter } from 'react-router';
import { logout } from '../../modules/user';
import AdminHeader from '../../components/common/AdminHeader';

const AdminHeaderContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(
    ({ user }) => ({ user: user.user }),
    shallowEqual,
  );

  const handleLogout = useCallback(() => {
    dispatch(logout());
    history.push('/');
  }, [history, dispatch]);

  return <AdminHeader user={user} onLogout={handleLogout} />;
};

export default withRouter(AdminHeaderContainer);
