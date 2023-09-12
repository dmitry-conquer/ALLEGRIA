import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export function useToast() {
  const toastOptions = {
    position: toast.POSITION.TOP_RIGHT,
    type: toast.TYPE.DEFAULT,
    closeOnClick: true,
    autoClose: 4000,
    hideProgressBar: true,
    theme: toast.THEME.LIGHT,
    transition: toast.TRANSITIONS.BOUNCE,
  };
  return { toast, toastOptions };
}