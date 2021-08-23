import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import RegisterUserPage from './pages/RegisterUserPage';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import CartPage from './pages/CartPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import PurchasePage from './pages/PurchasePage';
import OrderListPage from './pages/OrderListPage';
import ManageUsersPage from './pages/ManageUsersPage';
import ManageCategoryPage from './pages/ManageCategoryPage';
import RegisterProductPage from './pages/RegisterProductPage';
import ManageProductListPage from './pages/ManageProductListPage';
import ManageProductDetailPage from './pages/ManageProductDetailPage';
import ManageOrderListPage from './pages/ManageOrderListPage';

const App = () => {
  return (
    <>
      <Route component={MainPage} path={'/'} exact />
      <Route component={RegisterUserPage} path={'/register'} />
      <Route component={LoginPage} path={'/login'} />
      <Route component={MyPage} path={'/mypage'} />
      <Route component={CartPage} path={'/cart'} />
      <Route
        component={ProductListPage}
        path={['/product-list', '/product-list/:category']}
      />
      <Route
        component={ProductDetailPage}
        path={'/product-detail/:productId'}
      />
      <Route component={PurchasePage} path={'/purchase'} />
      <Route component={OrderListPage} path={'/order'} />
      <Route component={ManageUsersPage} path={'/manage/user'} />
      <Route component={ManageCategoryPage} path={'/manage/category'} />
      <Route component={RegisterProductPage} path={'/register-product'} />
      <Route
        component={ManageProductListPage}
        path={['/manage/product-list', '/manage/product-list/:category']}
      />
      <Route
        component={ManageProductDetailPage}
        path={'/manage/product-detail/:productId'}
      />
      <Route component={ManageOrderListPage} path={'/manage/order-list'} />
    </>
  );
};

export default App;
