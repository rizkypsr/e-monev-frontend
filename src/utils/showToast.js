import { toast } from "react-toastify";

export default function showToastMsg(type, message, onClose) {
  const config = {
    onClose,
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: 3000,
  };

  switch (type) {
    case "info":
      toast.info(message, config);
      break;
    case "warning":
      toast.warning(message, config);
      break;
    case "error":
      toast.error(message, config);
      break;
    default:
      toast.success(message, config);
  }
}
