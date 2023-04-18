import { forwardRef, useImperativeHandle, useState } from 'react';
import styled from 'styled-components';
import Toast from '../../components/common/Toast';
import ReactDOM from 'react-dom';
import useToastPortal from '../useToastPortal';
import useToastAutoClose from '../useToastAutoClose';
import uuid from '../util/uuid';

const ToastListBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ToastPortal = forwardRef(({ autoClose, autoCloseTime = 3000 }, ref) => {
  const { loaded, portalId } = useToastPortal();
  const [toasts, setToasts] = useState([]);

  useImperativeHandle(ref, () => ({
    addMessage(toast) {
      setToasts([...toasts, { ...toast, id: uuid() }]);
    },
  }));

  const handleClose = (id) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };

  useToastAutoClose({
    toasts,
    setToasts,
    autoClose,
    autoCloseTime,
  });

  return loaded ? (
    ReactDOM.createPortal(
      <ToastListBlock>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            mode={toast.mode}
            message={toast.message}
            onClose={() => handleClose(toast.id)}
          />
        ))}
      </ToastListBlock>,
      document.getElementById(portalId),
    )
  ) : (
    <></>
  );
});

export default ToastPortal;
