import React from "react";
import TutorPosts from "src/components/Posts/TutorManage/TutorPosts";
import Page401 from "src/components/error/Page401";
import Layout from "src/components/layout/Layout";
import { LIST_ROLE_KEY } from "src/constants/enumConstants";
import { useAuthContext } from "src/context/AuthContext";

function TutorManagePostPage() {
  const { roleId } = useAuthContext();
  return (
    <Layout className="p-5 bg-[#F6F5FA]">
      {Number(roleId) === LIST_ROLE_KEY.TUTOR ? <TutorPosts /> : <Page401 />}
    </Layout>
  );
}

export default TutorManagePostPage;
