import React from "react";
import NewHomePage from "./pages/NewHomePage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import ListPostsPage from "./pages/ListPostsPage";
import {
  ADMIN_ROUTER,
  PRIVATE_ROUTER,
  PUBLIC_ROUTER,
} from "./constants/RouterConstant";
import EditProfilePage from "./pages/EditProfilePage";
import CreatePostPage from "./pages/CreatePostPage";
import TutorManagePostPage from "./pages/TutorManagePostPage";
import NotFound from "./pages/NotFound";
import TutorViewPostDetail from "./pages/TutorViewPostDetail";
import TutorEditPostPage from "./pages/TutorEditPostPage";
import AdminManagePostPage from "./pages/AdminManagePostPage";
import AdminViewPostDetail from "./pages/AdminViewPostDetail";
import AdminManageUserPage from "./pages/AdminManageUserPage";
import ChatBoxPage from "./pages/ChatBoxPage";
import ListTutorPage from "./pages/ListTutorPage";
import TutorDetailPage from "./pages/TutorDetailPage";

//list your routes here
export const routes = [
  { path: PUBLIC_ROUTER.LOGIN, element: <LoginPage /> },
  { path: PUBLIC_ROUTER.REGISTER, element: <RegisterPage /> },
  { path: PUBLIC_ROUTER.FORGET_PASSWORD, element: <ForgetPasswordPage /> },
  { path: PUBLIC_ROUTER.TUTOR, element: <ListTutorPage /> },
  { path: PUBLIC_ROUTER.TUTOR_DETAIL, element: <TutorDetailPage /> },

  { path: PUBLIC_ROUTER.POST, element: <ListPostsPage /> },
  { path: PRIVATE_ROUTER.CREATE_POST, element: <CreatePostPage /> },
  { path: PRIVATE_ROUTER.MANAGE_POST, element: <TutorManagePostPage /> },
  { path: PRIVATE_ROUTER.EDIT_POST, element: <TutorEditPostPage /> },
  { path: PRIVATE_ROUTER.POST_DETAIL, element: <TutorViewPostDetail /> },
  { path: PRIVATE_ROUTER.CHAT_BOX, element: <ChatBoxPage /> },

  { path: PRIVATE_ROUTER.PROFILE, element: <ProfilePage /> },
  { path: PRIVATE_ROUTER.EDIT_PROFILE, element: <EditProfilePage /> },

  { path: ADMIN_ROUTER.MANAGE_POST, element: <AdminManagePostPage /> },
  { path: ADMIN_ROUTER.MANAGE_POST_DETAIL, element: <AdminViewPostDetail /> },
  { path: ADMIN_ROUTER.MANAGE_USER, element: <AdminManageUserPage /> },

  { path: PUBLIC_ROUTER.HOME, element: <NewHomePage /> },
  { path: "*", element: <NotFound /> },
];
