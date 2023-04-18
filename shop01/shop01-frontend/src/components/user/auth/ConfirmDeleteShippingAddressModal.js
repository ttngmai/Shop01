import React from 'react';
import ConfirmModal from '../../common/ConfirmModal';

const ConfirmDeleteShippingAddressModal = ({ onCancel, onConfirm }) => {
  return (
    <ConfirmModal
      heading="배송지 삭제"
      description="해당 배송지를 삭제하시겠습니까?"
      confirmText="삭제"
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
};

export default ConfirmDeleteShippingAddressModal;
