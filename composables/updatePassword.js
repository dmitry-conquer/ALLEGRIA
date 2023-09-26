export const useUpdatePassword = async credentials => {
  const client = useSupabaseClient();
  const user = useSupabaseUser();
  const { toast, toastOptions } = useToast();

  const { errors, errorMessage } = useFormValidator({
    repeatPassword: credentials.repeatPassword,
    password: credentials.password,
  });
  if (errors) {
    toast.error(errorMessage, toastOptions);
    return { result: false };
  }

  const { data: authUpdateResult, error: authUpdateError } = await client.auth.updateUser({
    password: credentials.password,
  });
  const { data: tableUpdateResult, error: tableUpdateError } = await client
    .from("users")
    .update({ password: credentials.password })
    .eq("user_id", user.value.id)
    .select();
  if (authUpdateResult && tableUpdateResult) {
    toast.success("Пароль оновлено!", toastOptions);
    return { result: true };
  }
  if (authUpdateError || tableUpdateError) {
    toast.error("Помилка!", toastOptions);
    return { result: false };
  }
};
