import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as reviewsAPI from '../lib/api/reviews';

const INITIALIZE_REVIEWS = 'reviews/INITIALIZE_REVIEWS';
const [LIST_REVIEWS, LIST_REVIEWS_SUCCESS, LIST_REVIEWS_FAILURE] =
  createRequestActionTypes('reviews/LIST_REVIEWS');
const [READ_STAR_RATING, READ_STAR_RATING_SUCCESS, READ_STAR_RATING_FAILURE] =
  createRequestActionTypes('reviews/READ_STAR_RATING');

export const initializeReviews = createAction(INITIALIZE_REVIEWS);
export const listReviews = createAction(LIST_REVIEWS, ({ product, page }) => ({
  product,
  page,
}));
export const readStarRating = createAction(READ_STAR_RATING, ({ product }) => ({
  product,
}));

const listReviewsSaga = createRequestSaga(LIST_REVIEWS, reviewsAPI.listReviews);
const readStarRatingSaga = createRequestSaga(
  READ_STAR_RATING,
  reviewsAPI.readStarRating,
);

export function* reviewsSaga() {
  yield takeLatest(LIST_REVIEWS, listReviewsSaga);
  yield takeLatest(READ_STAR_RATING, readStarRatingSaga);
}

const initialState = {
  reviews: null,
  starRatingChart: null,
  error: null,
  totalPage: 1,
};

const reviews = handleActions(
  {
    [INITIALIZE_REVIEWS]: () => initialState,
    [LIST_REVIEWS_SUCCESS]: (state, { payload: reviews, meta: res }) =>
      produce(state, (draft) => {
        draft.reviews = draft.reviews ? draft.reviews.concat(reviews) : reviews;
        draft.totalPage = parseInt(res.headers['reviews-total-page'], 10);
      }),
    [LIST_REVIEWS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [READ_STAR_RATING_SUCCESS]: (state, { payload: starRatingChart }) =>
      produce(state, (draft) => {
        draft.starRatingChart = starRatingChart;
      }),
    [READ_STAR_RATING_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default reviews;
