import React from 'react';
import ConfirmModal from '../common/ConfirmModal';

const ConfirmDeleteCategoryModal = ({
  visible,
  onCancel,
  onConfirm,
  category,
}) => {
  return (
    <ConfirmModal
      visible={visible}
      heading="카테고리 삭제"
      description={`"${category.name}" 카테고리를 정말 삭제하시겠습니까?`}
      confirmText="삭제"
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
};

export default ConfirmDeleteCategoryModal;
