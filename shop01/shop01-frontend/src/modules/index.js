import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import products, { productsSaga } from './products';
import product, { productSaga } from './product';
import categories, { categoriesSaga } from './categories';
import cart, { cartSaga } from './cart';
import orders, { ordersSaga } from './orders';

const rootReducer = combineReducers({
  loading,
  auth,
  user,
  products,
  product,
  categories,
  cart,
  orders,
});

export function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    productsSaga(),
    productSaga(),
    categoriesSaga(),
    cartSaga(),
    ordersSaga(),
  ]);
}

export default rootReducer;
