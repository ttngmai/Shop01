import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
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
const CHANGE_QUANTITY = 'cart/CHANGE_QUANTITY';
const DECREASE_QUANTITY = 'cart/DECREASE_QUANTITY';
const INCREASE_QUANTITY = 'cart/INCREASE_QUANTITY';
const DELETE_ITEMS = 'cart/DELETE_ITEMS';
const DELETE_ITEM = 'cart/DELETE_ITEM';

export const initializeCart = createAction(INITIALIZE_CART);
export const readCart = createAction(READ_CART);
export const toggleAllChecked = createAction(
  TOGGLE_ALL_CHECKED,
  (checked) => checked,
);
export const toggleChecked = createAction(TOGGLE_CHECKED);
export const changeQuantity = createAction(
  CHANGE_QUANTITY,
  ({ id, quantity }) => ({ id, quantity }),
);
export const decreaseQuantity = createAction(
  DECREASE_QUANTITY,
  ({ id, difference }) => ({ id, difference }),
);
export const increaseQuantity = createAction(
  INCREASE_QUANTITY,
  ({ id, difference }) => ({ id, difference }),
);
export const deleteItems = createAction(DELETE_ITEMS, (ids) => ids);
export const deleteItem = createAction(DELETE_ITEM, (id) => id);

const readCartSaga = createRequestSaga(READ_CART, cartsAPI.readCart);
const deleteItemsSaga = function* (action) {
  yield call(cartsAPI.deleteItems, action.payload);
};
const deleteItemSaga = function* (action) {
  yield call(cartsAPI.deleteItem, action.payload);
};

export function* cartSaga() {
  yield takeLatest(READ_CART, readCartSaga);
  yield takeLatest(DELETE_ITEMS, deleteItemsSaga);
  yield takeLatest(DELETE_ITEM, deleteItemSaga);
}

const initialState = {
  cart: null,
  totalAmount: 0,
  error: null,
};

const getTotalAmount = (cart) => {
  return cart.reduce((sum, { price, quantity, checked }) => {
    return checked === true ? sum + price * quantity : sum;
  }, 0);
};

const cart = handleActions(
  {
    [INITIALIZE_CART]: () => initialState,
    [READ_CART_SUCCESS]: (state, { payload: cart }) =>
      produce(state, (draft) => {
        draft.cart = cart.map((item) => ({
          ...item,
          checked: true,
        }));
        draft.totalAmount = getTotalAmount(draft.cart);
      }),
    [READ_CART_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [TOGGLE_ALL_CHECKED]: (state, { payload: checked }) =>
      produce(state, (draft) => {
        draft.cart = state.cart.map((item) => ({ ...item, checked }));
        draft.totalAmount = getTotalAmount(draft.cart);
      }),
    [TOGGLE_CHECKED]: (state, { payload: id }) =>
      produce(state, (draft) => {
        draft.cart = state.cart.map((item) =>
          item.id === id ? { ...item, checked: !item.checked } : item,
        );
        draft.totalAmount = getTotalAmount(draft.cart);
      }),
    [CHANGE_QUANTITY]: (state, { payload: { id, quantity } }) =>
      produce(state, (draft) => {
        draft.cart = draft.cart.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity,
              }
            : item,
        );
        draft.totalAmount = getTotalAmount(draft.cart);
      }),
    [DECREASE_QUANTITY]: (state, { payload: { id, difference } }) =>
      produce(state, (draft) => {
        draft.cart = draft.cart.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity > 0 ? item.quantity - difference : 0,
              }
            : item,
        );
        draft.totalAmount = getTotalAmount(draft.cart);
      }),
    [INCREASE_QUANTITY]: (state, { payload: { id, difference } }) =>
      produce(state, (draft) => {
        draft.cart = draft.cart.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  item.quantity === '' ? 0 + difference : item.quantity + 1,
              }
            : item,
        );
        draft.totalAmount = getTotalAmount(draft.cart);
      }),
    [DELETE_ITEMS]: (state, payload) =>
      produce(state, (draft) => {
        draft.cart = state.cart.filter((item) => item.checked === false);
        draft.totalAmount = getTotalAmount(draft.cart);
      }),
    [DELETE_ITEM]: (state, { payload: id }) =>
      produce(state, (draft) => {
        draft.cart = state.cart.filter((item) => item.id !== id);
        draft.totalAmount = getTotalAmount(draft.cart);
      }),
  },
  initialState,
);

export default cart;
