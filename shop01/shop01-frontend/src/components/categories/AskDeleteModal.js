import React from 'react';
import AskModal from '../common/AskModal';

const AskDeleteModal = ({ visible, onCancel, onConfirm, category }) => {
  return (
    <AskModal
      visible={visible}
      title="카테고리 삭제"
      description={`"${category.name}" 카테고리를 정말 삭제하시겠습니까?`}
      confirmText="삭제"
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
};

export default AskDeleteModal;
