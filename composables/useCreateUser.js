export async function useCreateUser(credentials) {
  const client = useSupabaseClient();
  const { toast, toastOptions } = useToast();
  const { errors, errorMessage } = useFormValidator(credentials);
  if (errors) {
    toast.error(errorMessage, toastOptions);
    return false;
  }
  try {
    const { data, error } = await client.auth.signUp({
      email: credentials.email,
      password: credentials.password,
    });
    if (data.user) {
      try {
        const { data: profile, error: userError } = await client
          .from("users")
          .insert({
            email: credentials.email,
            password: credentials.password,
            first_name: credentials.firstName,
            last_name: credentials.lastName,
            tel: credentials.tel,
            user_id: data.user.id,
            favorites: [],
          })
          .select();
        if (profile) {
          toast.success(`Успішна реєстрація!`, toastOptions);
          setTimeout(() => {
            navigateTo("/");
          }, 2000);
        }
        if (userError) throw error;
      } catch (error) {
        showError(error);
        return false;
      }
    }
    if (error) throw error;
  } catch (error) {
    showError(error);
    return false;
  }

  function showError(error) {
    let errorMessage;
    switch (error.message) {
      case "User already registered":
        errorMessage = "Користувач з такою поштою вже зареєстрований";
        break;
      default:
        errorMessage = "Невідома помилка";
    }
    toast.error(errorMessage, toastOptions);
  }
  return false;
}
