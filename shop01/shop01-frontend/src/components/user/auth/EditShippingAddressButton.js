import React, { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import IconButton from '../../common/IconButton';
import { VscEdit } from 'react-icons/vsc';
import ModalPortal from '../../../lib/portal/ModalPortal';
import EditShippingAddressModal from './EditShippingAddressModal';

const EditShippingAddressButton = () => {
  const [modal, setModal] = useState(false);

  const { setValue, control } = useFormContext();

  const postCode = useWatch({
    control,
    name: 'postCode',
  });
  const address1 = useWatch({
    control,
    name: 'address1',
  });
  const address2 = useWatch({
    control,
    name: 'address2',
  });
  const shippingAddress = { postCode, address1, address2 };

  const handleClick = (e) => {
    e.stopPropagation();
    setModal(true);
  };

  const handleCancelEditButtonClick = (e) => {
    e.stopPropagation();
    setModal(false);
  };

  const handleConfirmEditButtonClick = (data, e) => {
    e.stopPropagation();
    const { address2 } = data;

    setValue('address2', address2, { shouldValidate: true, shouldDirty: true });

    setModal(false);
  };

  return (
    <>
      <IconButton type="button" onClick={handleClick}>
        <VscEdit />
      </IconButton>
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

export default EditShippingAddressButton;
