import React from 'react';
import AskModal from '../common/AskModal';

const AskDeleteModal = ({
  visible,
  onCancel,
  onConfirm,
  children,
}) => {
  return (
    <AskModal
      visible={visible}
      title="하위 카테고리 추가"
      description="추가할 카테고리의 이름을 입력해 주세요."
      confirmText="추가"
      onCancel={onCancel}
      onConfirm={onConfirm}
    >
      {children}
    </AskModal>
  );
};

export default AskDeleteModal;
