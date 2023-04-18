import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import theme from './lib/styles/theme';
import { Route } from 'react-router-dom';
import RouteIf from './lib/RouteIf';
import MainPage from './pages/MainPage';
import RegisterUserPage from './pages/RegisterUserPage';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AdminMainPage from './pages/AdminMainPage';
import OrderListPage from './pages/OrderListPage';
import ManageUsersPage from './pages/ManageUsersPage';
import ManageCategoriesPage from './pages/ManageCategoriesPage';
import RegisterProductPage from './pages/RegisterProductPage';
import ManageProductListPage from './pages/ManageProductListPage';
import ManageOrderListPage from './pages/ManageOrderListPage';

const App = () => {
  const { user } = useSelector(
    ({ user }) => ({ user: user.user }),
    shallowEqual,
  );

  return (
    <ThemeProvider theme={theme}>
      <Route component={MainPage} path={'/'} exact />
      <Route component={RegisterUserPage} path={'/user/register'} />
      <Route component={LoginPage} path={'/user/login'} />
      <Route component={MyPage} path={'/user/mypage'} />
      <Route component={CartPage} path={'/user/cart'} />
      <Route component={OrderPage} path={'/user/order'} exact />
      <Route component={OrderSuccessPage} path={'/user/order/success'} />
      <Route component={OrderListPage} path={'/user/order-list'} />
      <Route component={ProductListPage} path={'/product-list'} exact />
      <Route
        component={ProductDetailPage}
        path={'/product-detail/:productId'}
      />
      <RouteIf user={user} component={AdminMainPage} path={'/admin'} />
      <RouteIf user={user} component={ManageUsersPage} path={'/user/manage'} />
      <RouteIf
        user={user}
        component={ManageCategoriesPage}
        path={'/category/manage'}
      />
      <RouteIf
        user={user}
        component={RegisterProductPage}
        path={'/product/register'}
      />
      <RouteIf
        user={user}
        component={ManageProductListPage}
        path={'/product-list/manage'}
      />
      <RouteIf
        user={user}
        component={ManageOrderListPage}
        path={'/order/manage'}
      />
    </ThemeProvider>
  );
};

export default App;
