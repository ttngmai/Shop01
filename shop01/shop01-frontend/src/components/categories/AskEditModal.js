import React from 'react';
import AskModal from '../common/AskModal';

const AskEditModal = ({ visible, onCancel, onConfirm, category, children }) => {
  return (
    <AskModal
      visible={visible}
      title="카테고리 수정"
      description={`"${category.name}" 카테고리의 새 이름을 입력해 주세요.`}
      confirmText="저장"
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      {children}
    </AskModal>
  );
};

export default AskEditModal;
