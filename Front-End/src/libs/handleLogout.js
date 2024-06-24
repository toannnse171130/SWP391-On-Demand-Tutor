import cookie from "cookie";

export function logOut() {
  window.document.cookie = cookie.serialize("accessToken", "", {
    maxAge: -1, // Expire the accessToken immediately.
    path: "/",
  });
  localStorage.clear();
}
