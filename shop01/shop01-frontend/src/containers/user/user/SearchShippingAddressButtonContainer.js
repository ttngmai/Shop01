import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  initializeForm,
  changeField,
  registerShippingAddress,
} from '../../../modules/shippingAddress';
import SearchShippingAddressButton from '../../../components/user/user/SearchShippingAddressButton';
import ModalPortal from '../../../lib/portal/ModalPortal';
import SearchShippingAddressModal from '../../../components/common/SearchShippingAddressModal';
import RegisterShippingAddressModal from '../../../components/user/auth/RegisterShippingAddressModal';

const SearchShippingAddressButtonContainer = () => {
  const dispatch = useDispatch();
  const { form, shippingAddress } = useSelector(
    ({ shippingAddress }) => ({
      form: shippingAddress.register,
      shippingAddress: shippingAddress.shippingAddress,
    }),
    shallowEqual,
  );

  const [searchShippingAddressModal, setSearchShippingAddressModal] =
    useState(false);
  const [registerShippingAddressModal, setRegisterShippingAddressModal] =
    useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    setSearchShippingAddressModal(true);
  };

  const handleCancelStep1 = () => {
    setSearchShippingAddressModal(false);
  };

  const handleCompleteStep1 = (data) => {
    const zoneCode = data.zonecode;
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    dispatch(
      changeField({
        form: 'register',
        key: 'post_code',
        value: zoneCode,
      }),
    );

    dispatch(
      changeField({
        form: 'register',
        key: 'address1',
        value: fullAddress,
      }),
    );

    setSearchShippingAddressModal(false);
    setRegisterShippingAddressModal(true);
  };

  const handleCancelStep2 = () => {
    dispatch(initializeForm('register'));
    setRegisterShippingAddressModal(false);
  };

  const handleCompleteStep2 = (data) => {
    dispatch(registerShippingAddress(data));
    setRegisterShippingAddressModal(false);
  };

  useEffect(() => {
    if (shippingAddress) {
      dispatch(initializeForm('register'));
    }
  }, [shippingAddress, dispatch]);

  return (
    <>
      <SearchShippingAddressButton onClick={handleClick} />
      <ModalPortal>
        {searchShippingAddressModal && (
          <SearchShippingAddressModal
            onCancel={handleCancelStep1}
            onComplete={handleCompleteStep1}
          />
        )}
        {registerShippingAddressModal && (
          <RegisterShippingAddressModal
            shippingAddress={form}
            onCancel={handleCancelStep2}
            onSubmit={handleCompleteStep2}
          />
        )}
      </ModalPortal>
    </>
  );
};

export default SearchShippingAddressButtonContainer;
