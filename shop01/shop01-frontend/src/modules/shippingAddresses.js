import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as shippingAddressesAPI from '../lib/api/shippingAddresses';

const INITIALIZE_SHIPPING_ADDRESSES =
  'shippingAddresses/INITIALIZE_SHIPPING_ADDRESSES';
const [
  LIST_SHIPPING_ADDRESSES,
  LIST_SHIPPING_ADDRESSES_SUCCESS,
  LIST_SHIPPING_ADDRESSES_FAILURE,
] = createRequestActionTypes('shippingAddresses/LIST_SHIPPING_ADDRESSES');

export const initializeShippingAddresses = createAction(
  INITIALIZE_SHIPPING_ADDRESSES,
);
export const listShippingAddresses = createAction(LIST_SHIPPING_ADDRESSES);

export const listShippingAddressesSaga = createRequestSaga(
  LIST_SHIPPING_ADDRESSES,
  shippingAddressesAPI.listShippingAddresses,
);

export function* shippingAddressesSaga() {
  yield takeLatest(LIST_SHIPPING_ADDRESSES, listShippingAddressesSaga);
}

const initialState = {
  shippingAddresses: null,
  error: null,
};

const shippingAddresses = handleActions(
  {
    [INITIALIZE_SHIPPING_ADDRESSES]: () => initialState,
    [LIST_SHIPPING_ADDRESSES_SUCCESS]: (
      state,
      { payload: shippingAddresses },
    ) => ({
      ...state,
      shippingAddresses,
    }),
    [LIST_SHIPPING_ADDRESSES_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default shippingAddresses;
