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
import reviews, { reviewsSaga } from './reviews';
import review, { reviewSaga } from './review';

const rootReducer = combineReducers({
  loading,
  auth,
  user,
  products,
  product,
  categories,
  cart,
  orders,
  reviews,
  review,
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
    reviewsSaga(),
    reviewSaga(),
  ]);
}

export default rootReducer;
