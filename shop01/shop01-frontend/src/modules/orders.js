import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as ordersAPI from '../lib/api/orders';

const [LIST_ORDERS, LIST_ORDERS_SUCCESS, LIST_ORDERS_FAILURE] =
  createRequestActionTypes('orders/LIST_ORDERS');

export const listOrders = createAction(
  LIST_ORDERS,
);

const listOrdersSaga = createRequestSaga(LIST_ORDERS, ordersAPI.listOrders);

export function* ordersSaga() {
  yield takeLatest(LIST_ORDERS, listOrdersSaga);
}

const initialState = {
  orders: null,
  error: null,
  lastPage: 1,
};

const orders = handleActions(
  {
    [LIST_ORDERS_SUCCESS]: (state, { payload: orders, meta: res }) => ({
      ...state,
      orders,
      lastPage: parseInt(res.headers['last_page'], 10),
    }),
    [LIST_ORDERS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default orders;
