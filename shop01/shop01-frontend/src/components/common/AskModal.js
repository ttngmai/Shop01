import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const Fullscreen = styled.div`
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

const AskModalBlock = styled.div`
  width: 320px;
  padding: 1.5rem;
  border-radius: 4px;
  background: white;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.125);

  h2 {
    margin-top: 0;
    margin-bottom: 2rem;
  }

  .content {
    margin-bottom: 2rem;
  }

  .content input {
    margin-top: 1.5rem;
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
  }
`;

const StyledButton = styled(Button)`
  height: 2rem;

  & + & {
    margin-left: 0.75rem;
  }
`;

const AskModal = ({
  visible,
  title,
  description,
  confirmText = '확인',
  cancelText = '취소',
  onCancel,
  onConfirm,
  children,
}) => {
  if (!visible) return null;

  return (
    <Fullscreen>
      <AskModalBlock>
        <h2>{title}</h2>
        <div className="content">
          <p>{description}</p>
          {children}
        </div>
        <div className="buttons">
          <StyledButton onClick={onCancel}>{cancelText}</StyledButton>
          <StyledButton onClick={onConfirm}>{confirmText}</StyledButton>
        </div>
      </AskModalBlock>
    </Fullscreen>
  );
};

export default AskModal;
