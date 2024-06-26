import { updateProfileUrl, viewProfileUrl } from "src/constants/APIUrls";
import { putAPI, requestAPI } from "src/libs/api";

export const getProfileDetail = () => {
  return requestAPI({
    url: `${viewProfileUrl}`,
  });
};

export const updateProfileDetail = (newProfile) => {
  return putAPI({
    url: `${updateProfileUrl}`,
    data: newProfile,
  });
};
