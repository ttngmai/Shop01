import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
`;

const ConfirmModalBlock = styled.div`
  width: 425px;
  padding: 1.5rem;
  border-radius: 4px;
  background: white;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.125);
`;

const Heading = styled.h2`
  margin-top: 0;
  margin-bottom: 2rem;
`;

const ContentBox = styled.div`
  margin-bottom: 2rem;

  input {
    margin-top: 1.5rem;
  }
`;

const ButtonsBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledButton = styled(Button)`
  & + & {
    margin-left: 1rem;
  }
`;

const ConfirmModal = ({
  visible,
  heading,
  description,
  confirmText = '확인',
  cancelText = '취소',
  onCancel,
  onConfirm,
  children,
}) => {
  if (!visible) return null;

  const handlePreventBubbling = (e) => {
    e.stopPropagation();
  };

  return (
    <Background onClick={onCancel}>
      <ConfirmModalBlock onClick={handlePreventBubbling}>
        <Heading>{heading}</Heading>
        <ContentBox>
          <p>{description}</p>
          {children}
        </ContentBox>
        <ButtonsBox>
          <StyledButton onClick={onCancel} fullWidth>
            {cancelText}
          </StyledButton>
          <StyledButton onClick={onConfirm} fullWidth>
            {confirmText}
          </StyledButton>
        </ButtonsBox>
      </ConfirmModalBlock>
    </Background>
  );
};

export default ConfirmModal;
