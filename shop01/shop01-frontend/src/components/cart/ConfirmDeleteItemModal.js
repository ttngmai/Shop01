import React from 'react';
import ConfirmModal from '../common/ConfirmModal';

const ConfirmDeleteItemModal = ({ visible, onCancel, onConfirm, item }) => {
  return (
    <ConfirmModal
      visible={visible}
      heading="장바구니에서 삭제"
      description={`"${item.name}" 상품을 정말 삭제하시겠습니까?`}
      confirmText="삭제"
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
};

export default ConfirmDeleteItemModal;
