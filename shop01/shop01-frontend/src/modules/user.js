import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';

const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] =
  createRequestActionTypes('user/CHECK');
const LOGOUT = 'user/LOGOUT';

export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);

const checkSaga = createRequestSaga(CHECK, authAPI.check);

function* logoutSaga() {
  try {
    yield call(authAPI.logout);
  } catch (err) {
    console.log(err);
  }
}

export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}

const initialState = {
  user: null,
  error: null,
};

export default handleActions(
  {
    [CHECK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      error: null,
    }),
    [CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      error: error,
    }),
    [LOGOUT]: (state) => ({
      ...state,
      user: null,
    }),
  },
  initialState,
);
