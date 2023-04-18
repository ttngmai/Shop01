import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const ToastBlock = styled.div`
  padding: 1rem;
  border-radius: 4px;
  background-color: ${palette.indigo[7]};
  color: white;
  cursor: pointer;
  transition: all 0.2s linear;
  animation: fadein 0.5s;

  &:hover {
    transform: scale(0.95);
  }

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Toast = ({ mode, message, onClose }) => {
  return (
    <ToastBlock mode={mode} onClick={onClose}>
      {message}
    </ToastBlock>
  );
};

export default Toast;
