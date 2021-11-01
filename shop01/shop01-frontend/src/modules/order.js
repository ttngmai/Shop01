import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as ordersAPI from '../lib/api/orders';

const [CREATE_ORDER, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILURE] =
  createRequestActionTypes('order/CREATE_ORDER');

export const createOrder = createAction(CREATE_ORDER);