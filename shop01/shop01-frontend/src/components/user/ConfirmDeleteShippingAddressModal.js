import React from 'react';
import ConfirmModal from '../common/ConfirmModal';

const ConfirmDeleteShippingAddressModal = ({
  visible,
  onCancel,
  onConfirm,
}) => {
  return (
    <ConfirmModal
      visible={visible}
      heading="배송지 삭제"
      description="해당 배송지를 삭제하시겠습니까?"
      confirmText="삭제"
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
};

export default ConfirmDeleteShippingAddressModal;
