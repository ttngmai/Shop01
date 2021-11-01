import React, { useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { initializeForm, changeField } from '../../modules/shippingAddress';
import { useFormContext } from 'react-hook-form';
import SearchShippingAddressButton from '../../components/auth/SearchShippingAddressButton';
import ModalPortal from '../../lib/ModalPortal';
import SearchShippingAddressModal from '../../components/common/SearchShippingAddressModal';
import RegisterShippingAddressModal from '../../components/auth/RegisterShippingAddressModal';

const SearchShippingAddressButtonContainer = () => {
  const dispatch = useDispatch();
  const { form } = useSelector(
    ({ shippingAddress }) => ({
      form: shippingAddress.register,
    }),
    shallowEqual,
  );

  const [searchShippingAddressModal, setSearchShippingAddressModal] =
    useState(false);
  const [registerShippingAddressModal, setRegisterShippingAddressModal] =
    useState(false);

  const { setValue } = useFormContext();

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
    const { postCode, address1, address2 } = data;

    setValue('postCode', postCode, { shouldValidate: true, shouldDirty: true });
    setValue('address1', address1, { shouldValidate: true, shouldDirty: true });
    setValue('address2', address2, { shouldValidate: true, shouldDirty: true });

    dispatch(initializeForm('register'));

    setRegisterShippingAddressModal(false);
  };

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
