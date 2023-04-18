import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import palette from '../../../lib/styles/palette';
import IconButton from '../../common/IconButton';
import { VscTrash } from 'react-icons/vsc';
import ModalPortal from '../../../lib/portal/ModalPortal';
import ConfirmDeleteShippingAddressModal from './ConfirmDeleteShippingAddressModal';

const DeleteShippingAddressButton = () => {
  const [modal, setModal] = useState(false);

  const { setValue } = useFormContext();

  const handleClick = (e) => {
    e.stopPropagation();
    setModal(true);
  };

  const handleCancelDeleteButtonClick = (e) => {
    e.stopPropagation();
    setModal(false);
  };

  const handleConfirmDeleteButtonClick = (e) => {
    e.stopPropagation();

    setValue('postCode', '', { shouldValidate: true, shouldDirty: true });
    setValue('address1', '', { shouldValidate: true, shouldDirty: true });
    setValue('address2', '', { shouldValidate: true, shouldDirty: true });

    setModal(false);
  };

  return (
    <>
      <IconButton type="button" color={palette.red[7]} onClick={handleClick}>
        <VscTrash />
      </IconButton>
      <ModalPortal>
        {modal && (
          <ConfirmDeleteShippingAddressModal
            onCancel={handleCancelDeleteButtonClick}
            onConfirm={handleConfirmDeleteButtonClick}
          />
        )}
      </ModalPortal>
    </>
  );
};

export default DeleteShippingAddressButton;
