import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditShippingAddressButton from '../../../components/user/cart/EditShippingAddressButton';
import ShippingAddressListModal from '../../../components/user/cart/ShippingAddressListModal';
import ModalPortal from '../../../lib/portal/ModalPortal';
import { readShippingAddress } from '../../../modules/shippingAddress';

const EditShippingAddressButtonContainer = () => {
  const dispatch = useDispatch();
  const { selectedShippingAddress, shippingAddresses, error } = useSelector(
    ({ shippingAddress, shippingAddresses }) => ({
      selectedShippingAddress: shippingAddress.read.shippingAddress,
      shippingAddresses: shippingAddresses.shippingAddresses,
      error: shippingAddresses.error,
    }),
  );

  const [modal, setModal] = useState(false);

  const handleClick = useCallback((e) => {
    e.stopPropagation();
    setModal(true);
  }, []);

  const handleCancelEditButtonClick = useCallback((e) => {
    e.stopPropagation();
    setModal(false);
  }, []);

  const handleSubmit = useCallback(
    (data) => {
      const { shippingAddress } = data;
      const id = parseInt(shippingAddress);

      dispatch(readShippingAddress(id));
      setModal(false);
    },
    [dispatch],
  );

  return (
    <>
      <EditShippingAddressButton onClick={handleClick} />
      <ModalPortal>
        {modal && (
          <ShippingAddressListModal
            selectedShippingAddress={selectedShippingAddress}
            shippingAddresses={shippingAddresses}
            error={error}
            onCancel={handleCancelEditButtonClick}
            onSubmit={handleSubmit}
          />
        )}
      </ModalPortal>
    </>
  );
};

export default EditShippingAddressButtonContainer;
