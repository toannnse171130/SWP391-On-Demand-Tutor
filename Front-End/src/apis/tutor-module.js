import { testUrl } from "../constants/APIUrls";
import { requestAPI } from "../libs/api";

export const getListWeather = () => {
  return requestAPI({
    url: `${testUrl}`,
  });
};
