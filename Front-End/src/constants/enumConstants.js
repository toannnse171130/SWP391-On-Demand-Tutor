export const VALUE_DAYS_OF_WEEK = {
  Monday: "Monday",
  Tuesday: "Tuesday",
  Wednesday: "Wednesday",
  Thursday: "Thursday",
  Friday: "Friday",
  Saturday: "Saturday",
  Sunday: "Sunday",
};

export const DAYS_OF_WEEK = [
  { id: 1, value: VALUE_DAYS_OF_WEEK.Monday, label: "Thứ hai" },
  { id: 2, value: VALUE_DAYS_OF_WEEK.Tuesday, label: "Thứ ba" },
  { id: 3, value: VALUE_DAYS_OF_WEEK.Wednesday, label: "Thứ tư" },
  { id: 4, value: VALUE_DAYS_OF_WEEK.Thursday, label: "Thứ năm" },
  { id: 5, value: VALUE_DAYS_OF_WEEK.Friday, label: "Thứ sáu" },
  { id: 6, value: VALUE_DAYS_OF_WEEK.Saturday, label: "Thứ bảy" },
  { id: 7, value: VALUE_DAYS_OF_WEEK.Sunday, label: "Chủ nhật" },
];

export const LIST_ROLE_KEY = {
  ADMIN: 1,
  TUTOR: 2,
  STUDENT: 3,
  GUEST: 4,
};

export const TYPE_OF_FEE = {
  HOUR: "PerHour",
  DAY: "PerDay",
  WEEK: "PerWeek",
  MONTH: "PerMonth",
  YEAR: "PerYear",
};

export const LIST_TYPE_OF_FEE = [
  { id: 1, key: TYPE_OF_FEE.HOUR, value: "mỗi giờ" },
  { id: 2, key: TYPE_OF_FEE.DAY, value: "mỗi ngày" },
  { id: 3, key: TYPE_OF_FEE.WEEK, value: "mỗi tuần" },
  { id: 4, key: TYPE_OF_FEE.MONTH, value: "mỗi tháng" },
  { id: 5, key: TYPE_OF_FEE.YEAR, value: "mỗi năm" },
];

export const POST_STATUS = {
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

export const GENDER_STUDENT = {
  FEMALE: "Female",
  MALE: "Male",
  BOTH: "Both",
};

export const LIST_GENDER_POST = [
  { id: 1, key: GENDER_STUDENT.FEMALE, value: "nữ", name: "nữ" },
  { id: 2, key: GENDER_STUDENT.MALE, value: "nam", name: "nam" },
  { id: 3, key: GENDER_STUDENT.BOTH, value: "(nam/ nữ)", name: "(nam/ nữ)" },
];

export const LIST_TIME_PER_SECTION = [
  { id: 1, label: 1, value: 1 },
  { id: 2, label: 1.5, value: 1.5 },
  { id: 3, label: 2, value: 2 },
  { id: 4, label: 2.5, value: 2.5 },
  { id: 5, label: 3, value: 3 },
  { id: 6, label: 3.5, value: 3.5 },
];

export const LIST_STATUS_POST = [
  { id: -1, value: "Tất cả" },
  { id: 1, key: POST_STATUS.PENDING, value: "Đang chờ" },
  { id: 2, key: POST_STATUS.APPROVED, value: "Chấp thuận" },
  { id: 3, key: POST_STATUS.REJECTED, value: "Từ chối" },
];

export const LIST_STATUS_USER = [
  {
    id: 1,
    key: true,
    value: "Hoạt động",
  },
  {
    id: 2,
    key: false,
    value: "Bị cấm",
  },
];
