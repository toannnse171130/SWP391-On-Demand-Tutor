export const PUBLIC_ROUTER = {
  POST: "/bai-viet",
  HOME: "/",
  LOGIN: "/dang-nhap",
  REGISTER: "/dang-ky",
  FORGET_PASSWORD: "/quen-mat-khau",
  TUTOR: "/gia-su",
  TUTOR_DETAIL: "/gia-su/:id",
};

export const PRIVATE_ROUTER = {
  PROFILE: "/thong-tin-ca-nhan",
  EDIT_PROFILE: "/thong-tin-ca-nhan/chinh-sua",
  CREATE_POST: "/bai-viet-cua-toi/tao",
  MANAGE_POST: "/bai-viet-cua-toi",
  POST_DETAIL: "/bai-viet-cua-toi/:id",
  EDIT_POST: "/bai-viet-cua-toi/:id/chinh-sua",
  CHAT_BOX: "/tro-chuyen",
};

export const ADMIN_ROUTER = {
  MANAGE_POST: "/quan-ly/bai-viet",
  MANAGE_POST_DETAIL: "/quan-ly/bai-viet/:id",
  MANAGE_USER: "/quan-ly/nguoi-dung",
};
