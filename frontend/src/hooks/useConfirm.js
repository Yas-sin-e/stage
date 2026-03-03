import { useState, useCallback } from 'react';

export const useConfirm = () => {
  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    message: '',
    type: 'danger',
    onConfirm: null
  });

  const showConfirm = useCallback((message, type = 'danger') => {
    return new Promise((resolve) => {
      setConfirmState({
        isOpen: true,
        message,
        type,
        onConfirm: resolve
      });
    });
  }, []);

  const handleConfirm = useCallback(() => {
    confirmState.onConfirm?.(true);
    setConfirmState({ isOpen: false, message: '', type: 'danger', onConfirm: null });
  }, [confirmState]);

  const handleCancel = useCallback(() => {
    confirmState.onConfirm?.(false);
    setConfirmState({ isOpen: false, message: '', type: 'danger', onConfirm: null });
  }, [confirmState]);

  return { confirmState, showConfirm, handleConfirm, handleCancel };
};
