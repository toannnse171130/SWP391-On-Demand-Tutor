import React from "react";
import ProfilePageDetail from "src/components/EditProfile/ProfilePageDetail";
import Layout from "src/components/layout/Layout";

function ProfilePage() {
  return (
    <Layout className="p-5 bg-[#F6F5FA]">
      <ProfilePageDetail />
    </Layout>
  );
}

export default ProfilePage;
