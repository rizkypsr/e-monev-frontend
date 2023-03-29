import React, {
  createContext, useContext, useState, useMemo, useCallback,
} from 'react';
import { ToastContainer } from 'react-toastify';
import showToastMsg from '../utils/showToast';

export const ToastContext = createContext(null);

export const useToastContext = () => useContext(ToastContext);

function ToastProvider({ children }) {
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const showToastMessage = useCallback((message, type = 'success') => {
    setToastType(type);
    setToastMessage(message);
    setShowToast(true);
  }, []);

  const hideToastMessage = useCallback(() => {
    setShowToast(false);
  }, []);

  const value = useMemo(
    () => ({ showToast, showToastMessage, hideToastMessage }),
    [showToast, showToastMessage, hideToastMessage],
  );

  return (
    <ToastContext.Provider value={value}>
      <ToastContainer position="bottom-center" autoClose={4000} />
      {children}
      {showToast && showToastMsg(toastType, toastMessage, hideToastMessage)}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
