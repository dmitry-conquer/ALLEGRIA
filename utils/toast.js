import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export function useToast() {
  const toastOptions = {
    position: toast.POSITION.TOP_RIGHT,
    closeOnClick: true,
    autoClose: 2000,
    hideProgressBar: true,
    theme: toast.THEME.LIGHT,
    transition: toast.TRANSITIONS.BOUNCE,
  };
  return { toast, toastOptions };
}
