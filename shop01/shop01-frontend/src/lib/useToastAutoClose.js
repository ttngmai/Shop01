import { useState, useEffect } from 'react';

const useToastAutoClose = ({ toasts, setToasts, autoClose, autoCloseTime }) => {
  const [removing, setRemoving] = useState('');

  useEffect(() => {
    if (autoClose && toasts.length) {
      const id = toasts[toasts.length - 1].id;
      setTimeout(() => setRemoving(id), autoCloseTime);
    }
  }, [toasts, autoClose, autoCloseTime]);

  useEffect(() => {
    if (removing) {
      setToasts((toasts) => toasts.filter((toast) => toast.id !== removing));
    }
  }, [removing, setToasts]);
};

export default useToastAutoClose;
