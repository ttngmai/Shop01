import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as productsAPI from '../lib/api/products';

const INITIALIZE_PRODUCT = 'product/INITIALIZE_PRODUCT';
const CHANGE_FIELD = 'product/CHANGE_FIELD';
const [REGISTER_PRODUCT, REGISTER_PRODUCT_SUCCESS, REGISTER_PRODUCT_FAILURE] =
  createRequestActionTypes('product/REGISTER_PRODUCT');
const [READ_PRODUCT, READ_PRODUCT_SUCCESS, READ_PRODUCT_FAILURE] =
  createRequestActionTypes('product/READ_PRODUCT');

export const initializeProduct = createAction(INITIALIZE_PRODUCT);
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form,
    key,
    value,
  }),
);
export const registerProduct = createAction(
  REGISTER_PRODUCT,
  ( formData ) => ( formData ),
);
export const readProduct = createAction(READ_PRODUCT, (id) => id);

const registerProductSaga = createRequestSaga(
  REGISTER_PRODUCT,
  productsAPI.registerProduct,
);
const readProductSaga = createRequestSaga(
  READ_PRODUCT,
  productsAPI.readProduct,
);

export function* productSaga() {
  yield takeLatest(REGISTER_PRODUCT, registerProductSaga);
  yield takeLatest(READ_PRODUCT, readProductSaga);
}

const initialState = {
  read: {
    product: null,
  },
  register: {
    category: '',
    name: '',
    price: '',
    images: [
      { id: '1', imageBase64: '', imageFile: null },
      { id: '2', imageBase64: '', imageFile: null },
      { id: '3', imageBase64: '', imageFile: null },
      { id: '4', imageBase64: '', imageFile: null },
    ],
  },
  error: null,
};

const product = handleActions(
  {
    [INITIALIZE_PRODUCT]: () => initialState,
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [REGISTER_PRODUCT_SUCCESS]: () => initialState,
    [REGISTER_PRODUCT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [READ_PRODUCT_SUCCESS]: (state, { payload: product }) =>
      produce(state, (draft) => {
        draft.read.product = product;
      }),
    [READ_PRODUCT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default product;
