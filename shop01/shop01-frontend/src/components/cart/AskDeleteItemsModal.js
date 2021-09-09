import React from 'react';
import AskModal from '../common/AskModal';

const AskDeleteItemsModal = ({ visible, onCancel, onConfirm }) => {
  return (
    <AskModal
      visible={visible}
      title="장바구니에서 삭제"
      description="선택한 상품들을 정말 삭제하시겠습니까?"
      confirmText="삭제"
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
};

export default AskDeleteItemsModal;
