import React from "react";
import ViewAdminPost from "src/components/Posts/AdminManage/ViewAdminPost";
import Page401 from "src/components/error/Page401";
import Layout from "src/components/layout/Layout";
import { LIST_ROLE_KEY } from "src/constants/enumConstants";
import { useAuthContext } from "src/context/AuthContext";

function AdminViewPostDetail(props) {
  const { roleId } = useAuthContext();
  return (
    <Layout className="p-5 bg-[#F6F5FA]">
      {Number(roleId) === LIST_ROLE_KEY.ADMIN ? <ViewAdminPost /> : <Page401 />}
    </Layout>
  );
}

export default AdminViewPostDetail;
