import cookie from "cookie";
import { refreshAccessTokenUrl } from "../constants/APIUrls";
import { processDataLogin } from "./processDataLogin";
import { browserRedirectToIndexAfterSignOut } from "./redirect";
import axios from "axios";

const client = axios.create({
  url: `${process.env.REACT_APP_BASE_URL}`,
  headers: {
    "x-api-key": process.env.REACT_APP_BASE_URL,
  },
});

client.interceptors.request.use(
  (request) => {
    const cookies = cookie.parse(window?.document.cookie);
    if (cookies?.accessToken) {
      request.headers["Authorization"] = `Bearer ${cookies?.accessToken}`;
    }
    return request;
  },
  (error) => {
    console.log("Reject: ", error);
    return Promise.reject(error);
  }
);

export const convertObjectToQueryString = (parameters, prefix = "?") => {
  const query = Object.keys(parameters)
    .map((key) => {
      let value = parameters[key];

      if (typeof value === "boolean") value = value ? 1 : 0;

      return encodeURIComponent(key) + "=" + encodeURIComponent(value);
    })
    .join("&");

  return prefix + query;
};

export const refreshAccessToken = async () => {
  const cookies = cookie.parse(window?.document.cookie);

  const onSuccess = (response) => {
    const data = response?.data;
    processDataLogin(data);
  };

  const onError = (error) => {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key !== "TEST_KEY") {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => {
      localStorage.removeItem(key);
    });
    window.document.cookie = cookie.serialize("accessToken", "", {
      maxAge: -1, // Expire the accessToken immediately.
      path: "/",
    });
    window.document.cookie = cookie.serialize("refreshToken", "", {
      maxAge: -1, // Expire the refreshToken immediately.
      path: "/",
    });
    browserRedirectToIndexAfterSignOut();

    // optionaly catch errors and add some additional logging here
    return error;
  };

  const payload = {
    refreshToken: cookies.refreshToken,
  };

  if (cookies.refreshToken && !cookies.accessToken) {
    try {
      const response = await client({
        method: "post",
        url: refreshAccessTokenUrl,
        data: payload,
      });
      onSuccess(response);
    } catch (error) {
      onError(error);
    }
  }
};

export const requestAPI = async ({ ...options }) => {
  const onSuccess = (response) => response;
  const onError = async (error) => {
    return error;
  };
  return client.get(options.url).then(onSuccess).catch(onError);
};

export const postAPI = async ({ ...options }) => {
  const onSuccess = (response) => response;
  const onErrorPost = async (error) => {
    return error;
  };

  return client
    .post(options.url, options?.data)
    .then(onSuccess)
    .catch(onErrorPost);
};

export const putAPI = async ({ ...options }) => {
  const onSuccessPath = (response) => response;
  const onErrorPath = (error) => {
    return error;
  };

  return client
    .put(options.url, options?.data)
    .then(onSuccessPath)
    .catch(onErrorPath);
};

export const patchAPI = async ({ ...options }) => {
  const onSuccessPath = (response) => response;
  const onErrorPath = (error) => {
    return error;
  };

  return client
    .patch(options.url, options?.data)
    .then(onSuccessPath)
    .catch(onErrorPath);
};

export const deleteAPI = async ({ ...options }) => {
  const onSuccessDelete = (response) => response;
  const onErrorDelete = (error) => {
    return error;
  };

  return client({ method: "delete", ...options })
    .then(onSuccessDelete)
    .catch(onErrorDelete);
};
