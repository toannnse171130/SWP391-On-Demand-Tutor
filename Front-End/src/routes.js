import React from "react";
import CollectionPage from "./pages/CollectionPage";
import NewHomePage from "./pages/NewHomePage";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import ListPostsPage from "./pages/ListPostsPage";
import { PRIVATE_ROUTER, PUBLIC_ROUTER } from "./constants/RouterConstant";
import EditProfilePage from "./pages/EditProfilePage";
import CreatePostPage from "./pages/CreatePostPage";

//list your routes here
export const routes = [
  { path: "/collections", element: <CollectionPage /> },
  { path: "/collections/:slug", element: <CollectionPage /> },
  { path: PUBLIC_ROUTER.LOGIN, element: <LoginPage /> },
  { path: PUBLIC_ROUTER.REGISTER, element: <RegisterPage /> },
  { path: PUBLIC_ROUTER.FORGET_PASSWORD, element: <ForgetPasswordPage /> },

  { path: PUBLIC_ROUTER.POST, element: <ListPostsPage /> },
  { path: PRIVATE_ROUTER.CREATE_POST, element: <CreatePostPage /> },

  { path: PRIVATE_ROUTER.PROFILE, element: <ProfilePage /> },
  { path: PRIVATE_ROUTER.EDIT_PROFILE, element: <EditProfilePage /> },

  { path: PUBLIC_ROUTER.HOME, element: <NewHomePage /> },
  { path: "*", element: <NotFound /> },
];
