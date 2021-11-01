import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as shippingAddressesAPI from '../lib/api/shippingAddresses';
import { listShippingAddressesSaga } from './shippingAddresses';

const INITIALIZE_FORM = 'shippingAddress/INITIALIZE_FORM';
const CHANGE_FIELD = 'shippingAddress/CHANGE_FIELD';
const [
  REGISTER_SHIPPING_ADDRESS,
  REGISTER_SHIPPING_ADDRESS_SUCCESS,
  REGISTER_SHIPPING_ADDRESS_FAILURE,
] = createRequestActionTypes('shippingAddress/REGISTER_SHIPPING_ADDRESS');
const [
  READ_SHIPPING_ADDRESS,
  READ_SHIPPING_ADDRESS_SUCCESS,
  READ_SHIPPING_ADDRESS_FAILURE,
] = createRequestActionTypes('shippingAddress/READ_SHIPPING_ADDRESS');

export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form,
    key,
    value,
  }),
);
export const registerShippingAddress = createAction(
  REGISTER_SHIPPING_ADDRESS,
  (formData) => formData,
);
export const readShippingAddress = createAction(
  READ_SHIPPING_ADDRESS,
  (id) => id,
);

const registerShippingAddressSaga = createRequestSaga(
  REGISTER_SHIPPING_ADDRESS,
  shippingAddressesAPI.registerShippingAddress,
);
const readShippingAddressSaga = createRequestSaga(
  READ_SHIPPING_ADDRESS,
  shippingAddressesAPI.readShippingAddress,
);

export function* shippingAddressSaga() {
  yield takeLatest(REGISTER_SHIPPING_ADDRESS, registerShippingAddressSaga);
  yield takeLatest(
    REGISTER_SHIPPING_ADDRESS_SUCCESS,
    listShippingAddressesSaga,
  );
  yield takeLatest(READ_SHIPPING_ADDRESS, readShippingAddressSaga);
}

const initialState = {
  read: {
    shippingAddress: null,
  },
  register: {
    post_code: '',
    address1: '',
    address2: '',
  },
  shippingAddress: null,
  error: null,
};

const shippingAddress = handleActions(
  {
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      error: null,
    }),
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [REGISTER_SHIPPING_ADDRESS_SUCCESS]: (
      state,
      { payload: shippingAddress },
    ) => ({
      ...state,
      shippingAddress,
      error: null,
    }),
    [REGISTER_SHIPPING_ADDRESS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [READ_SHIPPING_ADDRESS_SUCCESS]: (state, { payload: shippingAddress }) =>
      produce(state, (draft) => {
        draft.read.shippingAddress = shippingAddress;
      }),
    [READ_SHIPPING_ADDRESS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default shippingAddress;
