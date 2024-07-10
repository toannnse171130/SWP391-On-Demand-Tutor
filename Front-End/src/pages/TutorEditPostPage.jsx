import React from "react";
import EditPostDetail from "src/components/Posts/TutorManage/EditPostDetail";
import Page401 from "src/components/error/Page401";
import Layout from "src/components/layout/Layout";
import { LIST_ROLE_KEY } from "src/constants/enumConstants";
import { useAuthContext } from "src/context/AuthContext";

function TutorEditPostPage(props) {
  const { roleId } = useAuthContext();
  return (
    <Layout className="p-5 bg-[#F6F5FA]">
      {Number(roleId) === LIST_ROLE_KEY.TUTOR ? (
        <EditPostDetail />
      ) : (
        <Page401 />
      )}
    </Layout>
  );
}

export default TutorEditPostPage;
