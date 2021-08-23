import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

export const createRequestActionTypes = type => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
}

export default function createRequestSaga(type, req) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    yield put(startLoading(type));
    try {
      const res = yield call(req, action.payload);
      yield put({
        type: SUCCESS,
        payload: res.data,
        meta: res,
      })
    } catch (err) {
      yield put({
        type: FAILURE,
        payload: err,
        error: true,
      });
    }
    yield put(finishLoading(type));
  };
}
