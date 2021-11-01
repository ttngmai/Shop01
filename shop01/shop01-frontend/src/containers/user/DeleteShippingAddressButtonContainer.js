import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import DeleteShippingAddressButton from '../../components/user/DeleteShippingAddressButton';
import ModalPortal from '../../lib/ModalPortal';
import ConfirmDeleteShippingAddressModal from '../../components/user/ConfirmDeleteShippingAddressModal';
import { deleteShippingAddress } from '../../lib/api/shippingAddresses';
import { listShippingAddresses } from '../../modules/shippingAddresses';

const DeleteShippingAddressButtonContainer = ({ id }) => {
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    setModal(true);
  };

  const handleCancelDeleteButtonClick = (e) => {
    e.stopPropagation();
    setModal(false);
  };

  const handleConfirmDeleteButtonClick = async (e) => {
    e.stopPropagation();

    try {
      await deleteShippingAddress(id);
      dispatch(listShippingAddresses());
    } catch (err) {
      console.log(err);
    } finally {
      setModal(false);
    }
  };

  return (
    <>
      <DeleteShippingAddressButton onClick={handleClick} />
      <ModalPortal>
        <ConfirmDeleteShippingAddressModal
          visible={modal}
          onCancel={handleCancelDeleteButtonClick}
          onConfirm={handleConfirmDeleteButtonClick}
        />
      </ModalPortal>
    </>
  );
};

export default DeleteShippingAddressButtonContainer;
