import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as cartsAPI from '../lib/api/carts';

const INITIALIZE_CART = 'cart/INITIALIZE_CART';
const [READ_CART, READ_CART_SUCCESS, READ_CART_FAILURE] =
  createRequestActionTypes('cart/READ_CART');
const TOGGLE_ALL_CHECKED = 'cart/TOGGLE_ALL_CHECKED';
const TOGGLE_CHECKED = 'cart/TOGGLE_CHECKED';
const DELETE_ITEM = 'cart/DELETE_ITEM';

export const initializeCart = createAction(INITIALIZE_CART);
export const readCart = createAction(READ_CART);
export const toggleAllChecked = createAction(
  TOGGLE_ALL_CHECKED,
  (checked) => checked,
);
export const toggleChecked = createAction(TOGGLE_CHECKED);
export const deleteItem = createAction(DELETE_ITEM, (id) => id);

const readCartSaga = createRequestSaga(READ_CART, cartsAPI.readCart);
const deleteItemSaga = function* (action) {
  yield call(cartsAPI.deleteItem, action.payload);
};

export function* cartSaga() {
  yield takeLatest(READ_CART, readCartSaga);
  yield takeLatest(DELETE_ITEM, deleteItemSaga);
}

const initialState = {
  cart: null,
  error: null,
};

const cart = handleActions(
  {
    [INITIALIZE_CART]: () => initialState,
    [READ_CART_SUCCESS]: (state, { payload: cart }) => ({
      ...state,
      cart: cart.map((item) => ({
        ...item,
        checked: true,
      })),
    }),
    [READ_CART_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [TOGGLE_ALL_CHECKED]: (state, { payload: checked }) => ({
      ...state,
      cart: state.cart.map((item) => ({ ...item, checked })),
    }),
    [TOGGLE_CHECKED]: (state, { payload: id }) => ({
      ...state,
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    }),
    [DELETE_ITEM]: (state, { payload: id }) => ({
      ...state,
      cart: state.cart.filter((item) => item.id !== id),
    }),
  },
  initialState,
);

export default cart;
