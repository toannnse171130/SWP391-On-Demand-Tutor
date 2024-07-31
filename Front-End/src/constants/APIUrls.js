export const baseUrl = process.env.REACT_APP_BASE_URL;

export const refreshAccessTokenUrl = `${baseUrl}auth/refresh-token`;

export const uploadImageUrl = `${baseUrl}/Users/UploadImage`;

export const testUrl = `${baseUrl}WeatherForecast`;

export const registerUrl = `${baseUrl}api/Authentication/register`;

export const loginUrl = `${baseUrl}api/Authentication/login`;

export const viewProfileUrl = `${baseUrl}api/Account/profile/view`;

export const updateProfileUrl = `${baseUrl}api/Account/profile/update`;

export const changePasswordUrl = `${baseUrl}api/Account/change-password`;

export const commonPostUrl = `${baseUrl}api/Common/post`;

export const tutorPostUrl = `${baseUrl}api/Account/post`;

export const adminPostUrl = `${baseUrl}api/Admin/post`;

export const adminUserUrl = `${baseUrl}api/Admin/user`;

export const accountChatUrl = `${baseUrl}api/Account/chat`;

export const chatSignalUrl = `${baseUrl}chatHub`;

export const tutorsUrl = `${baseUrl}api/Common/tutors`;

export const tutorDetailUrl = `${baseUrl}api/Common/tutor-details`;

export const getFeedBackUrl = `${baseUrl}api/Common/get-feedbacks-by-id`;

export const feedbackUrl = `${baseUrl}api/Feedback`;
