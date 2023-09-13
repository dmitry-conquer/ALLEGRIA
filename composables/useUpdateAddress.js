export const useUpdateAddress = async credentials => {
  const { toast, toastOptions } = useToast();
  const { errors, errorMessage } = useFormValidator(credentials);
  if (errors) {
    toast.error(errorMessage, toastOptions);
    return;
  }
  const { data, error } = await useFetch("/api/profile/", {
    method: "POST",
    body: {
      delivery: credentials,
    },
  });
  if (data.value) {
    toast.success("Оновлено!", toastOptions);
  }
  if (error.value) {
    toast.error("Помилка оновлення!", toastOptions);
  }
};
