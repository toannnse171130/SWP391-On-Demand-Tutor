import { m } from "framer-motion";
import { LIST_ROLE_KEY } from "./enumConstants";

export const LIST_GENDER_VALUE = [
  { id: 1, value: true, name: "Nam" },
  { id: 2, value: false, name: "Nữ" },
];

export const LIST_ROLE_VALUE = [
  { id: 1, value: LIST_ROLE_KEY.TUTOR, name: "Gia sư" },
  { id: 2, value: LIST_ROLE_KEY.STUDENT, name: "Học sinh" },
  { id: 3, value: LIST_ROLE_KEY.ADMIN, name: "Admin" },
];

export const DEFAULT_IMG = {
  LOGO: "/images/logo/avatar.jpg",
  TUTOR: "/images/logo/avatar.jpg",
  ADMIN: "/images/logo/avatar.jpg",
};

export const LIST_ROLE_AVATAR = [
  { id: 1, value: LIST_ROLE_KEY.TUTOR, avatar: DEFAULT_IMG.TUTOR },
  { id: 2, value: LIST_ROLE_KEY.STUDENT, avatar: DEFAULT_IMG.LOGO },
  { id: 3, value: LIST_ROLE_KEY.ADMIN, avatar: DEFAULT_IMG.ADMIN },
];

export const LIST_REGION = [
  {
    id: 1,
    value: "Online",
  },
  {
    id: 2,
    value: "An Giang",
  },
  {
    id: 3,
    value: "Bà Rịa - Vũng Tàu",
  },
  {
    id: 4,
    value: "Bắc Giang",
  },
  {
    id: 5,
    value: "Bắc Kạn",
  },
  {
    id: 6,
    value: "Bạc Liêu",
  },
  {
    id: 7,
    value: "Bắc Ninh",
  },
  {
    id: 8,
    value: "Bến Tre",
  },
  {
    id: 9,
    value: "Bình Định",
  },
  {
    id: 10,
    value: "Bình Dương",
  },
  {
    id: 11,
    value: "Bình Phước",
  },
  {
    id: 12,
    value: "Bình Thuận",
  },
  {
    id: 13,
    value: "Cà Mau",
  },
  {
    id: 14,
    value: "Cần Thơ",
  },
  {
    id: 15,
    value: "Cao Bằng",
  },
  {
    id: 16,
    value: "Đà Nẵng",
  },
  {
    id: 17,
    value: "Đắk Lắk",
  },
  {
    id: 18,
    value: "Đắk Nông",
  },
  {
    id: 19,
    value: "Điện Biên",
  },
  {
    id: 20,
    value: "Đồng Nai",
  },
  {
    id: 21,
    value: "Đồng Tháp",
  },
  {
    id: 22,
    value: "Gia Lai",
  },
  {
    id: 23,
    value: "Hà Giang",
  },
  {
    id: 24,
    value: "Hà Nam",
  },
  {
    id: 25,
    value: "Hà Nội",
  },
  {
    id: 26,
    value: "Hà Tĩnh",
  },
  {
    id: 27,
    value: "Hải Dương",
  },
  {
    id: 28,
    value: "Hải Phòng",
  },
  {
    id: 29,
    value: "Hậu Giang",
  },
  {
    id: 30,
    value: "Hòa Bình",
  },
  {
    id: 31,
    value: "Hưng Yên",
  },
  {
    id: 32,
    value: "Khánh Hòa",
  },
  {
    id: 33,
    value: "Kiên Giang",
  },
  {
    id: 34,
    value: "Kon Tum",
  },
  {
    id: 35,
    value: "Lai Châu",
  },
  {
    id: 36,
    value: "Lâm Đồng",
  },
  {
    id: 37,
    value: "Lạng Sơn",
  },
  {
    id: 38,
    value: "Lào Cai",
  },
  {
    id: 39,
    value: "Long An",
  },
  {
    id: 40,
    value: "Nam Định",
  },
  {
    id: 41,
    value: "Nghệ An",
  },
  {
    id: 42,
    value: "Ninh Bình",
  },
  {
    id: 43,
    value: "Ninh Thuận",
  },
  {
    id: 44,
    value: "Phú Thọ",
  },
  {
    id: 45,
    value: "Phú Yên",
  },
  {
    id: 46,
    value: "Quảng Bình",
  },
  {
    id: 47,
    value: "Quảng Nam",
  },
  {
    id: 48,
    value: "Quảng Ngãi",
  },
  {
    id: 49,
    value: "Quảng Ninh",
  },
  {
    id: 50,
    value: "Quảng Trị",
  },
  {
    id: 51,
    value: "Sóc Trăng",
  },
  {
    id: 52,
    value: "Sơn La",
  },
  {
    id: 53,
    value: "Tây Ninh",
  },
  {
    id: 54,
    value: "Thái Bình",
  },
  {
    id: 55,
    value: "Thái Nguyên",
  },
  {
    id: 56,
    value: "Thanh Hóa",
  },
  {
    id: 57,
    value: "Thừa Thiên Huế",
  },
  {
    id: 58,
    value: "Tiền Giang",
  },
  {
    id: 59,
    value: "TP Hồ Chí Minh",
  },
  {
    id: 60,
    value: "Trà Vinh",
  },
  {
    id: 61,
    value: "Tuyên Quang",
  },
  {
    id: 62,
    value: "Vĩnh Long",
  },
  {
    id: 63,
    value: "Vĩnh Phúc",
  },
  {
    id: 64,
    value: "Yên Bái",
  },
  {
    id: 65,
    value: "Bình Định",
  },
];

export const IKCONTEXT_URL = {
  ENDPOINT: "https://ik.imagekit.io/ducdev",
  PUBLICT_KEY: "public_BGrQKRolO4l3XPbDjMv8IxPx1oo=",
};
