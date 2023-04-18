import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import EditShippingAddressButton from '../../../components/user/user/EditShippingAddressButton';
import ModalPortal from '../../../lib/portal/ModalPortal';
import EditShippingAddressModal from '../../../components/user/auth/EditShippingAddressModal';
import { updateShippingAddress } from '../../../lib/api/shippingAddresses';
import { listShippingAddresses } from '../../../modules/shippingAddresses';

const EditShippingAddressButtonContainer = ({ shippingAddress }) => {
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    setModal(true);
  };

  const handleCancelEditButtonClick = (e) => {
    e.stopPropagation();
    setModal(false);
  };

  const handleConfirmEditButtonClick = async (data, e) => {
    e.stopPropagation();

    console.log('폼 제출');
    console.log(data);

    const { id } = shippingAddress;
    const { address2, is_default } = data;

    try {
      await updateShippingAddress({ id, address2, is_default });
      dispatch(listShippingAddresses());
    } catch (err) {
      console.log(err);
    } finally {
      setModal(false);
    }
  };

  return (
    <>
      <EditShippingAddressButton onClick={handleClick} />
      <ModalPortal>
        {modal && (
          <EditShippingAddressModal
            shippingAddress={shippingAddress}
            onCancel={handleCancelEditButtonClick}
            onSubmit={handleConfirmEditButtonClick}
          />
        )}
      </ModalPortal>
    </>
  );
};

export default EditShippingAddressButtonContainer;
