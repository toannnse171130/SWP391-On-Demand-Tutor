import {
  accountChatUrl,
  adminUserUrl,
  changePasswordUrl,
  updateProfileUrl,
  viewProfileUrl,
} from "src/constants/APIUrls";
import {
  convertObjectToQueryString,
  postAPI,
  putAPI,
  requestAPI,
} from "src/libs/api";

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

export const changePasswordAccount = (newData) => {
  return putAPI({
    url: `${changePasswordUrl}`,
    data: newData,
  });
};

export const getListUser = (queryObj) => {
  const queryString = convertObjectToQueryString(queryObj);
  return requestAPI({
    url: `${adminUserUrl}${queryString}`,
  });
};

export const changeUserDetail = (submitObj) => {
  return putAPI({
    url: `${adminUserUrl}`,
    data: submitObj,
  });
};

export const getListChatAccount = () => {
  return requestAPI({
    url: `${accountChatUrl}`,
  });
};

export const getChatAccountDetail = (id) => {
  return requestAPI({
    url: `${accountChatUrl}/inbox/${id}`,
  });
};

export const sendNewChat = (submitObj) => {
  return postAPI({
    url: `${accountChatUrl}`,
    data: submitObj,
  });
};
