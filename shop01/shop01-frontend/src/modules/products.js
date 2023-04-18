import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest, call, put } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import { startLoading, finishLoading } from './loading';
import * as productsAPI from '../lib/api/products';

const [LIST_PRODUCTS, LIST_PRODUCTS_SUCCESS, LIST_PRODUCTS_FAILURE] =
  createRequestActionTypes('products/LIST_PRODUCTS');
const [UPDATE_DISPLAY, UPDATE_DISPLAY_SUCCESS, UPDATE_DISPLAY_FAILURE] =
  createRequestActionTypes('products/UPDATE_DISPLAY');

export const listProducts = createAction(
  LIST_PRODUCTS,
  ({ category, name, page, type = 'user' }) => ({ category, name, page, type }),
);
export const updateDisplay = createAction(
  UPDATE_DISPLAY,
  ({ id, display }) => ({ id, display }),
);

const listProductsSaga = function* (action) {
  let req = productsAPI.listProducts;

  if (action.payload.type === 'admin') {
    req = productsAPI.listProductsForAdmin;
  }

  yield put(startLoading(LIST_PRODUCTS));
  try {
    const res = yield call(req, action.payload);
    yield put({
      type: LIST_PRODUCTS_SUCCESS,
      payload: res.data,
      meta: res,
    });
  } catch (err) {
    yield put({
      type: LIST_PRODUCTS_FAILURE,
      payload: err,
      error: true,
    });
  }
  yield put(finishLoading(LIST_PRODUCTS));
};

const updateDisplaySaga = createRequestSaga(
  UPDATE_DISPLAY,
  productsAPI.updateDisplay,
);

export function* productsSaga() {
  yield takeLatest(LIST_PRODUCTS, listProductsSaga);
  yield takeLatest(UPDATE_DISPLAY, updateDisplaySaga);
}

const initialState = {
  products: null,
  error: null,
  totalPage: 1,
};

const products = handleActions(
  {
    [LIST_PRODUCTS_SUCCESS]: (state, { payload: products, meta: res }) => ({
      ...state,
      products,
      totalPage: parseInt(res.headers['products-total-page'], 10),
    }),
    [LIST_PRODUCTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UPDATE_DISPLAY_SUCCESS]: (state, { payload }) => {
      return produce(state, (draft) => {
        console.log(payload);
        const product = draft.products.find(
          (product) => product.id === payload.id,
        );
        product.display = payload.display;
      });
    },
    [UPDATE_DISPLAY_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default products;
