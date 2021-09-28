import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as reviewsAPI from '../lib/api/reviews';

const INITIALIZE_REVIEW = 'review/INITIALIZE_REVIEW';
const CHANGE_FIELD = 'review/CHANGE_FIELD';
const [WRITE_REVIEW, WRITE_REVIEW_SUCCESS, WRITE_REVIEW_FAILURE] =
  createRequestActionTypes('review/WRITE_REVIEW');
const [READ_REVIEW, READ_REVIEW_SUCCESS, READ_REVIEW_FAILURE] =
  createRequestActionTypes('review/READ_REVIEW');

export const initializeReview = createAction(INITIALIZE_REVIEW);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const writeReview = createAction(
  WRITE_REVIEW,
  ({ star_rating, text, product_id }) => ({ star_rating, text, product_id }),
);

const writeReviewSaga = createRequestSaga(WRITE_REVIEW, reviewsAPI.writeReview);
const readProductSaga = createRequestSaga(READ_REVIEW, reviewsAPI.readReview);

export function* reviewSaga() {
  yield takeLatest(WRITE_REVIEW, writeReviewSaga);
  yield takeLatest(READ_REVIEW, readProductSaga);
}

const initialState = {
  starRating: 0,
  text: '',
  review: null,
  error: null,
};

const review = handleActions(
  {
    [INITIALIZE_REVIEW]: () => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [WRITE_REVIEW]: (state) => ({
      ...state,
      review: null,
      error: null,
    }),
    [WRITE_REVIEW_SUCCESS]: (state, { payload: review }) => ({
      ...state,
      review,
    }),
    [WRITE_REVIEW_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default review;
