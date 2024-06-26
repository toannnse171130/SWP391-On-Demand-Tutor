import React from "react";
import TutorPosts from "src/components/Posts/TutorManage/TutorPosts";
import Layout from "src/components/layout/Layout";

function TutorManagePostPage() {
  return (
    <Layout className="p-5 bg-[#F6F5FA]">
      <TutorPosts />
    </Layout>
  );
}

export default TutorManagePostPage;
