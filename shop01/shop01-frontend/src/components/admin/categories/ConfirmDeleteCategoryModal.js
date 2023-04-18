import React from 'react';
import ConfirmModal from '../../common/ConfirmModal';

const ConfirmDeleteCategoryModal = ({ category, onCancel, onConfirm }) => {
  return (
    <ConfirmModal
      heading="카테고리 삭제"
      description={`"${category.name}" 카테고리를 정말 삭제하시겠습니까?`}
      confirmText="삭제"
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
};

export default ConfirmDeleteCategoryModal;
