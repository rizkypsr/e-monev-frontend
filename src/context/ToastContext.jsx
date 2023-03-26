import { createContext, useContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import showToastMsg from "../utils/showToast";

export const ToastContext = createContext(null);

export const useToastContext = () => useContext(ToastContext);

const ToastProvider = ({ children }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const showToastMessage = (message, type = "success") => {
    setToastType(type);
    setToastMessage(message);
    setShowToast(true);
  };

  const hideToastMessage = () => {
    setShowToast(false);
  };

  return (
    <ToastContext.Provider
      value={{ showToast, showToastMessage, hideToastMessage }}
    >
      <ToastContainer position="bottom-center" autoClose={4000} />
      {children}
      {showToast && showToastMsg(toastType, toastMessage, hideToastMessage)}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
