import React from 'react';
import AskModal from '../common/AskModal';

const AskDeleteModal = ({ visible, onCancel, onConfirm, item }) => {
  return (
    <AskModal
      visible={visible}
      title="장바구니에서 삭제"
      description={`"${item.name}" 상품을 정말 삭제하시겠습니까?`}
      confirmText="삭제"
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
};

export default AskDeleteModal;
