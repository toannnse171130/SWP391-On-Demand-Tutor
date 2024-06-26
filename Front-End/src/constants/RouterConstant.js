export const PUBLIC_ROUTER = {
  POST: "/bai-viet",
  HOME: "/",
  LOGIN: "/dang-nhap",
  REGISTER: "/dang-ky",
  FORGET_PASSWORD: "/quen-mat-khau",
};

export const PRIVATE_ROUTER = {
  PROFILE: "/thong-tin-ca-nhan",
  EDIT_PROFILE: "/thong-tin-ca-nhan/chinh-sua",
  CREATE_POST: "/bai-viet-cua-toi/tao",
  MANAGE_POST: "/bai-viet-cua-toi",
  POST_DETAIL: "/bai-viet-cua-toi/:id",
  EDIT_POST: "/bai-viet-cua-toi/:id/edit",
};
