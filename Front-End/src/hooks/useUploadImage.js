import { useState } from "react";
import { toast } from "react-toastify";

function useUploadImage() {
  const [imageUrlResponse, setImageUrlResponse] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);

  const onErrorUpload = (err) => {
    console.log("Upload image error", err);
    toast.error("Upload image error");
    setLoadingImage(false);
  };

  const onSuccessUpload = (res) => {
    console.log("Success", res);
    setImageUrlResponse(res?.url);
    setLoadingImage(false);
  };

  return {
    imageUrlResponse,
    onSuccessUpload,
    onErrorUpload,
    loadingImage,
    setLoadingImage,
  };
}

export default useUploadImage;
