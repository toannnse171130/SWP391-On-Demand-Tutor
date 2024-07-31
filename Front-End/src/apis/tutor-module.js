import {
  feedbackUrl,
  getFeedBackUrl,
  tutorDetailUrl,
  tutorsUrl,
} from "../constants/APIUrls";
import { convertObjectToQueryString, postAPI, requestAPI } from "../libs/api";

export const getListTutors = (queryObj) => {
  const queryString = convertObjectToQueryString(queryObj);
  return requestAPI({
    url: `${tutorsUrl}/${queryString}`,
  });
};

export const getTutorDetail = (id) => {
  return requestAPI({
    url: `${tutorDetailUrl}/${id}`,
  });
};

export const getListCommentByTutorId = (id) => {
  return requestAPI({
    url: `${getFeedBackUrl}/${id}`,
  });
};

export const leaveFeedback = (submitObj) => {
  return postAPI({
    url: `${feedbackUrl}`,
    data: submitObj,
  });
};

export const getRandomImage = () => {
  const randomId = Math.floor(Math.random() * 10);
  return requestAPI({
    url: `https://picsum.photos/id/${randomId}/600/400`,
  });
};
