export const useUpdateAddress = async credentials => {
  const client = useSupabaseClient();
  const user = useSupabaseUser();
  const { toast, toastOptions } = useToast();
  const { errors, errorMessage } = useFormValidator(credentials);
  if (errors) {
    toast.error(errorMessage, toastOptions);
    return;
  }
  const { data, error } = await client.from("users").update({delivery: credentials}).eq("user_id", user.value.id).select();
  if (data) {
    toast.success("Оновлено!", toastOptions);
  }
  if (error) {
    console.log(error);
    toast.error("Помилка оновлення!", toastOptions);
  }
};
