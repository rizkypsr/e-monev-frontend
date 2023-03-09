import { createContext, useContext, useState } from "react";

export const ToastContext = createContext();

export const useToastContext = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToastMessage = (message) => {
    setShowToast(true);
    setToastMessage(message);
  };

  const hideToastMessage = () => {
    setShowToast(false);
    setToastMessage("");
  };

  const value = {
    showToast,
    toastMessage,
    showToastMessage,
    hideToastMessage,
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};
