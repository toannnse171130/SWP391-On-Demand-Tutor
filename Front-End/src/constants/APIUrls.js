export const baseUrl = process.env.REACT_APP_BASE_URL;

export const refreshAccessTokenUrl = `${baseUrl}auth/refresh-token`;

export const uploadImageUrl = `${baseUrl}/Users/UploadImage`;

export const testUrl = `${baseUrl}WeatherForecast`;

export const registerUrl = `${baseUrl}api/Authentication/register`;

export const loginUrl = `${baseUrl}api/Authentication/login`;

export const viewProfileUrl = `${baseUrl}api/Account/profile/view`;

export const updateProfileUrl = `${baseUrl}api/Account/profile/update`;
