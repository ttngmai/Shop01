import React from 'react';
import { Route } from 'react-router-dom';
import ForbiddenPage from '../pages/ForbiddenPage';

const RouteIf = ({ admin_yn, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!admin_yn) {
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
