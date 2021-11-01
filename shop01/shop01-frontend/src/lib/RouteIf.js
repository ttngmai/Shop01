import React from 'react';
import { Route } from 'react-router-dom';
import ForbiddenPage from '../pages/ForbiddenPage';

const RouteIf = ({ user, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user || user.Role.name !== 'ADMIN') {
          return <ForbiddenPage />;
        }

        if (Component) {
          return <Component {...props} />;
        }

        return null;
      }}
    />
  );
};

export default RouteIf;
