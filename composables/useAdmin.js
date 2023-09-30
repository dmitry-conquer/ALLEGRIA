export async function uploadFiles(images, files) {
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
        autoClose: 2000,
        closeOnClick: true,
        closeButton: true,
        type: "error",
        isLoading: false,
      });
      return;
    }
    const { data, error: getUrlError } = client.storage.from("products_images").getPublicUrl(file.name);
    if (getUrlError) {
      toast.update(toastLoading, {
        render: "Помилка!",
        autoClose: 2000,
        closeOnClick: true,
        closeButton: true,
        type: "error",
        isLoading: false,
      });
      return;
    }
    images.push(data.publicUrl);
  }
  toast.update(toastLoading, {
    render: "Завантажено!",
    autoClose: 2000,
    closeOnClick: true,
    closeButton: true,
    type: "success",
    isLoading: false,
  });
}

export async function removeImage(images, index) {
  images.splice(index, 1);
}

export async function updateProduct(product, id) {
  const client = useSupabaseClient();
  const { toast, toastOptions } = useToast();
  const toastId = toast.loading("Зберігаю...", toastOptions);

  const { error } = await client.from("products").update(product).eq("id", id);
  if (error) {
    toast.update(toastId, {
      render: "Помилка!",
      autoClose: 2000,
      closeOnClick: true,
      closeButton: true,
      type: "error",
      isLoading: false,
    });
    return false;
  } else {
    refreshNuxtData();
    toast.update(toastId, {
      render: "Збережено!",
      autoClose: 2000,
      closeOnClick: true,
      closeButton: true,
      type: "success",
      isLoading: false,
    });
    return true;
  }
}
