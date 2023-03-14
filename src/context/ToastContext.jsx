// import { createContext, useContext, useState } from "react";
// import showToast from "../utils/showToast";

import { createContext, useContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import showToastMessage from "../utils/showToast";

// export const ToastContext = createContext();

// export const useToastContext = () => useContext(ToastContext);

// export const ToastProvider = ({ children }) => {
//   const [toastMessage, setToastMessage] = useState("");
//   const [toastType, setToastType] = useState("");

//   const showToastMessage = (message, type = "success") => {
//     setToastType(type);
//     setToastMessage(message);
//   };

//   const hideToastMessage = () => {
//     setToastType("");
//     setToastMessage("");
//   };

//   return (
//     <ToastContext.Provider
//       value={{ showToastMessage, showToast, hideToastMessage }}>
//       {children}
//       {toastType && showToast(toastType, toastMessage, hideToastMessage)}
//     </ToastContext.Provider>
//   );
// };

export const ToastContext = createContext(null);

export const useToastContext = () => useContext(ToastContext);

const ToastProvider = ({ children }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const showToastMsg = (message, type = "success") => {
    setToastType(type);
    setToastMessage(message);
    setShowToast(true);
  };

  const hideToastMessage = () => {
    setShowToast(false);
  };

  return (
    <ToastContext.Provider
      value={{ showToast, showToastMessage: showToastMsg, hideToastMessage }}>
      <ToastContainer
        position="bottom-center"
        autoClose={4000}
      />
      {children}
      {showToast && showToastMessage(toastType, toastMessage, hideToastMessage)}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
