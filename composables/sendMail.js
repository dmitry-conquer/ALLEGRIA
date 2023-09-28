export const useSendMail = async credentials => {
  const { toast, toastOptions } = useToast();

  const { errors, errorMessage } = useFormValidator(credentials);
  if (errors) {
    toast.error(errorMessage, toastOptions);
    return { result: false };
  }

  const formData = new FormData();
  //   Object.values(files.value).forEach(file => {
  //     formData.append("file", file);
  //   });
  formData.append("firstName", credentials.firstName);
  formData.append("lastName", credentials.lastName);
  formData.append("tel", credentials.tel);
  formData.append("email", credentials.email);
  formData.append("date", credentials.date);
  const { data, error } = await useFetch("/api/sendMail", {
    method: "POST",
    body: formData,
  });
  if (data.value && data.value.every(mail => mail.hasOwnProperty("messageId"))) {
    toast.success("Лист надіслано!", toastOptions);
  } else if (error.value) {
    toast.error("Помилка!", toastOptions);
  }
};
