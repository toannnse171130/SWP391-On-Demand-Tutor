import { loginUrl, registerUrl } from "src/constants/APIUrls";
import { postAPI } from "src/libs/api";

export const registerNewAccount = (newData) => {
  return postAPI({
    url: `${registerUrl}`,
    data: newData,
  });
};

export const loginNewAccount = (newData) => {
  return postAPI({
    url: `${loginUrl}`,
    data: newData,
  });
};
