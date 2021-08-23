import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as categoriesAPI from '../lib/api/categories';

const [LIST_CATEGORIES, LIST_CATEGORIES_SUCCESS, LIST_CATEGORIES_FAILURE] =
  createRequestActionTypes('categories/LIST_CATEGORIES');

export const listCategories = createAction(LIST_CATEGORIES, (name) => name);

const listCategoriesSaga = createRequestSaga(
  LIST_CATEGORIES,
  categoriesAPI.listCategories,
);

export function* categoriesSaga() {
  yield takeLatest(LIST_CATEGORIES, listCategoriesSaga);
}

const initialState = {
  categories: null,
  error: null,
};

const categories = handleActions(
  {
    [LIST_CATEGORIES_SUCCESS]: (state, { payload: categories }) => ({
      ...state,
      categories,
    }),
    [LIST_CATEGORIES_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default categories;
