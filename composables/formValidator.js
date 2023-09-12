export const useFormValidator = () => {
  const emailValid = target => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(target);
  };
  const telValid = target => {
    return /^(\+380\s\d{2}\s\d{3}-\d{2}-\d{2})$/.test(target);
  };
  const isEmpty = target => {
    return /^$/.test(target);
  };
  return { emailValid, telValid, isEmpty };
};
