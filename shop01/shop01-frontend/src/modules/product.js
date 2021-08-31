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
const CHANGE_QUANTITY = 'product/CHANGE_QUANTITY';
const DECREASE_QUANTITY = 'product/DECREASE_QUANTITY';
const INCREASE_QUANTITY = 'product/INCREASE_QUANTITY';
const CHANGE_TOTAL_AMOUNT = 'product/CHANGE_TOTAL_AMOUNT';

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
  (formData) => formData,
);
export const readProduct = createAction(READ_PRODUCT, (id) => id);
export const changeQuantity = createAction(
  CHANGE_QUANTITY,
  (quantity) => quantity,
);
export const decreaseQuantity = createAction(
  DECREASE_QUANTITY,
  (difference) => difference,
);
export const increaseQuantity = createAction(
  INCREASE_QUANTITY,
  (difference) => difference,
);
export const changeTotalAmount = createAction(
  CHANGE_TOTAL_AMOUNT,
  (totalAmount) => totalAmount,
);

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
    totalAmount: 0,
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
        draft.read.product = { ...product, quantity: 1 };
      }),
    [READ_PRODUCT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [CHANGE_QUANTITY]: (state, { payload: quantity }) =>
      produce(state, (draft) => {
        draft.read.product.quantity = quantity;
      }),
    [DECREASE_QUANTITY]: (state, { payload: difference }) =>
      produce(state, (draft) => {
        draft.read.product.quantity =
          draft.read.product.quantity > 0
            ? draft.read.product.quantity - difference
            : 0;
      }),
    [INCREASE_QUANTITY]: (state, { payload: difference }) =>
      produce(state, (draft) => {
        draft.read.product.quantity =
          draft.read.product.quantity === ''
            ? 0 + difference
            : draft.read.product.quantity + 1;
      }),
    [CHANGE_TOTAL_AMOUNT]: (state, { payload: totalAmount }) =>
      produce(state, (draft) => {
        draft.read.totalAmount = totalAmount;
      }),
  },
  initialState,
);

export default product;
