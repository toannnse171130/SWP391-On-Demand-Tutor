import React from "react";
import EditPostDetail from "src/components/Posts/TutorManage/EditPostDetail";
import Layout from "src/components/layout/Layout";

function TutorEditPostPage(props) {
  return (
    <Layout className="p-5 bg-[#F6F5FA]">
      <EditPostDetail />
    </Layout>
  );
}

export default TutorEditPostPage;
