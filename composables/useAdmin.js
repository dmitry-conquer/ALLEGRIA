export async function useAdminUploadFiles(images, files) {
  const client = useSupabaseClient();
  const { toast, toastOptions } = useToast();
  const toastLoading = toast.loading("Завантажую...", toastOptions);
  for (const file of Object.values(files)) {
    const { error: uploadError } = await client.storage.from("products_images").upload(file.name, file, {
      cacheControl: "3600",
      upsert: true,
    });
    if (uploadError) {
      toast.update(toastLoading, {
        render: `${uploadError.message}`,
        isLoading: false,
        type: "error",
        ...toastOptions,
      });
      return;
    }
    const { data, error: getUrlError } = client.storage.from("products_images").getPublicUrl(file.name);
    if (getUrlError) {
      toast.update(toastLoading, {
        render: `${getUrlError.message}`,
        isLoading: false,
        type: "error",
        ...toastOptions,
      });
      return;
    }
    images.push(data.publicUrl);
  }
  toast.update(toastLoading, {
    render: `Завантажено!`,
    isLoading: false,
    type: "success",
    ...toastOptions,
  });
}

export async function useAdminRemoveImage(images, index) {
  images.splice(index, 1);
}

export async function useAdminUpdateProduct(product, id) {
  const client = useSupabaseClient();
  const { toast, toastOptions } = useToast();
  const toastLoading = toast.loading("Зберігаю...", toastOptions);

  const { error } = await client.from("products").update(product).eq("id", id);
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
    render: `Збережено!`,
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

export async function useAdminDeleteProduct(id) {
  const client = useSupabaseClient();
  const { toast, toastOptions } = useToast();
  const toastLoading = toast.loading("Видаляю...", toastOptions);
  const { error } = await client.from("products").delete().eq("id", id);
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
