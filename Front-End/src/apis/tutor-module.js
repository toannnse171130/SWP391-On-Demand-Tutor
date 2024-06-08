import { countryUrl, testUrl } from "../constants/APIConfig";
import { requestAPI } from "../libs/api";

export const getListCountry = () => {
  return requestAPI({
    url: `${countryUrl}`,
  });
};

export const getListWeather = () => {
  return requestAPI({
    url: `${testUrl}`,
  });
};
