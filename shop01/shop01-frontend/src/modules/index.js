import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import products, { productsSaga } from './products';
import product, { productSaga } from './product';
import categories, { categoriesSaga } from './categories';

const rootReducer = combineReducers({
  loading,
  auth,
  user,
  products,
  product,
  categories,
});

export function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    productsSaga(),
    productSaga(),
    categoriesSaga(),
  ]);
}

export default rootReducer;
