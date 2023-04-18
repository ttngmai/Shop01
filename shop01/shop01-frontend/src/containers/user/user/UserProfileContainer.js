import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { check } from '../../../modules/user';
import UserProfile from '../../../components/user/user/UserProfile';

const UserProfileContainer = () => {
  const dispatch = useDispatch();
  const { user, error } = useSelector(
    ({ user }) => ({
      user: user.user,
      error: user.error,
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(check());
  }, [dispatch]);

  return <UserProfile user={user} error={error} />;
};

export default UserProfileContainer;
