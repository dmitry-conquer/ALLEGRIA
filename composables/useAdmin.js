export const constants = () => {
  const TABLE_ITEM_PER_PAGE = 20;
  return { TABLE_ITEM_PER_PAGE };
};

/*
  upload image/images
*/

export async function useAdminUploadImages(files) {
  const client = useSupabaseClient();
  const { toast, toastOptions } = useToast();
  const toastLoading = toast.loading("Завантажую...", toastOptions);
  let result;
  try {
    if (Array.isArray(files)) {
      result = [];
      for (const file of Object.values(files)) {
        const { error: uploadError } = await client.storage.from("products_images").upload(file.name, file, {
          cacheControl: "3600",
          upsert: true,
        });
        if (uploadError) {
          throw uploadError;
        }
        const { data, error: getUrlError } = client.storage.from("products_images").getPublicUrl(file.name);
        if (getUrlError) {
          throw getUrlError;
        }
        result.push(data.publicUrl);
      }
    } else {
      result = "";
      const { error: uploadError } = await client.storage.from("products_images").upload(files.name, files, {
        cacheControl: "3600",
        upsert: true,
      });
      if (uploadError) {
        throw uploadError;
      }
      const { data, error: getUrlError } = client.storage.from("products_images").getPublicUrl(files.name);
      if (getUrlError) {
        throw getUrlError;
      }
      result = data.publicUrl;
    }
  } catch (error) {
    toast.update(toastLoading, {
      render: `${error.message}`,
      isLoading: false,
      type: "error",
      ...toastOptions,
    });
    return;
  }

  toast.update(toastLoading, {
    render: `Завантажено!`,
    isLoading: false,
    type: "success",
    ...toastOptions,
  });
  return result;
}

/*
  update table
*/

export async function useAdminUpdateTable(table, dataToUpdate, colName, rowIdentifier) {
  const client = useSupabaseClient();
  const { toast, toastOptions } = useToast();
  const toastLoading = toast.loading("Оновлюю...", toastOptions);

  try {
    const { error } = await client.from(table).update(dataToUpdate).eq(colName, rowIdentifier);
    if (error) {
      throw error;
    }
  } catch (error) {
    toast.update(toastLoading, {
      render: `Помилка оновлення!`,
      isLoading: false,
      type: "error",
      ...toastOptions,
    });
    return false;
  }

  toast.update(toastLoading, {
    render: `Дані оновлено!`,
    isLoading: false,
    type: "success",
    ...toastOptions,
  });
  return true;
}

export async function useAdminCreateProduct(product) {
  const client = useSupabaseClient();
  const { toast, toastOptions } = useToast();
  const toastLoading = toast.loading("Створюю...", toastOptions);

  const { error } = await client.from("products").insert(product);
  if (error) {
    toast.update(toastLoading, {
      render: `${error.message}`,
      isLoading: false,
      type: "error",
      ...toastOptions,
    });
    return false;
  }
  toast.update(toastLoading, {
    render: `Створено!`,
    isLoading: false,
    type: "success",
    ...toastOptions,
  });
  return true;
}

export async function useAdminDeleteItem(table, id) {
  const client = useSupabaseClient();
  const { toast, toastOptions } = useToast();
  const toastLoading = toast.loading("Видаляю...", toastOptions);
  const { error } = await client.from(table).delete().eq("id", id);
  if (error) {
    toast.update(toastLoading, {
      render: `${error.message}`,
      isLoading: false,
      type: "error",
      ...toastOptions,
    });
    return false;
  }
  toast.update(toastLoading, {
    render: `Видалено!`,
    isLoading: false,
    type: "success",
    ...toastOptions,
  });
  return true;
}

export function useAdminDateFormater(dateString) {
  const date = new Date(dateString);
  const formatDatePart = part => part.toString().padStart(2, "0");
  const formattedDate = `${formatDatePart(date.getDate())}.${formatDatePart(
    date.getMonth() + 1,
  )}.${date.getFullYear()} / ${formatDatePart(date.getHours())}:${formatDatePart(date.getMinutes())}`;
  return formattedDate;
}

export function useAdminUid() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
