import jsSHA from "jssha";

export const useSha1 = string => {
  const signature = ref("");
  const sha1 = new jsSHA("SHA-1", "TEXT");
  sha1.update(string);
  signature.value = sha1.getHash("B64");
  return {
    signature,
  };
};
