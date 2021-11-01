import React from 'react';
import ConfirmModal from '../common/ConfirmModal';

const ConfirmDeleteItemsModal = ({ visible, onCancel, onConfirm }) => {
  return (
    <ConfirmModal
      visible={visible}
      heading="장바구니에서 삭제"
      description="선택한 상품들을 정말 삭제하시겠습니까?"
      confirmText="삭제"
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
};

export default ConfirmDeleteItemsModal;
