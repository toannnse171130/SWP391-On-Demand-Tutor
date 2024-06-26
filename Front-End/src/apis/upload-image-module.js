import { uploadImageUrl } from "src/constants/APIUrls";
import { postAPI } from "src/libs/api";

export const uploadImage = (newImage) => {
  return postAPI({
    url: `${uploadImageUrl}`,
    data: newImage,
  });
};
