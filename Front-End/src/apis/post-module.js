import {
  adminPostUrl,
  commonPostUrl,
  tutorPostUrl,
} from "src/constants/APIUrls";
import {
  convertObjectToQueryString,
  deleteAPI,
  postAPI,
  putAPI,
  requestAPI,
} from "src/libs/api";

export const getListPosts = (queryObj) => {
  const queryString = convertObjectToQueryString(queryObj);
  return requestAPI({
    url: `${commonPostUrl}${queryString}`,
  });
};

export const getListTutorPosts = (queryObj) => {
  const queryString = convertObjectToQueryString(queryObj);
  return requestAPI({
    url: `${tutorPostUrl}${queryString}`,
  });
};

export const getTutorPostDetail = (id) => {
  return requestAPI({
    url: `${tutorPostUrl}/${id}`,
  });
};

export const createNewPostDetail = (submitObj) => {
  return postAPI({
    url: `${tutorPostUrl}`,
    data: submitObj,
  });
};

export const editNewPostDetail = (submitObj) => {
  return putAPI({
    url: `${tutorPostUrl}`,
    data: submitObj,
  });
};

export const deletePostDetail = (id) => {
  return deleteAPI({
    url: `${tutorPostUrl}/${id}`,
  });
};

export const getListAdminPosts = (queryObj) => {
  const queryString = convertObjectToQueryString(queryObj);
  return requestAPI({
    url: `${adminPostUrl}${queryString}`,
  });
};

export const changePostStatusDetail = (submitObj) => {
  return putAPI({
    url: `${adminPostUrl}/manage`,
    data: submitObj,
  });
};

export const getAdminPostDetail = (id) => {
  return requestAPI({
    url: `${adminPostUrl}/${id}`,
  });
};
