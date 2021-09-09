import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import RegisterUserPage from './pages/RegisterUserPage';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import CartPage from './pages/CartPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import OrderListPage from './pages/OrderListPage';
import ManageUsersPage from './pages/ManageUsersPage';
import ManageCategoriesPage from './pages/ManageCategoriesPage';
import RegisterProductPage from './pages/RegisterProductPage';
import ManageProductListPage from './pages/ManageProductListPage';
import ManageOrderListPage from './pages/ManageOrderListPage';

const App = () => {
  return (
    <>
      <Route component={MainPage} path={'/'} exact />
      <Route component={RegisterUserPage} path={'/user/register'} />
      <Route component={LoginPage} path={'/user/login'} />
      <Route component={MyPage} path={'/user/mypage'} />
      <Route component={CartPage} path={'/user/cart'} />
      <Route component={OrderSuccessPage} path={'/user/order/success'} />
      <Route component={OrderListPage} path={'/user/order'} exact />
      <Route component={ProductListPage} path={'/product-list'} />
      <Route component={ProductDetailPage} path={'/product-detail/:productId'} />
      <Route component={ManageUsersPage} path={'/user/manage'} />
      <Route component={ManageCategoriesPage} path={'/category/manage'} />
      <Route component={RegisterProductPage} path={'/product/register'} />
      <Route component={ManageProductListPage} path={'/product/manage'} />
      <Route component={ManageOrderListPage} path={'/order/manage'} />
    </>
  );
};

export default App;
