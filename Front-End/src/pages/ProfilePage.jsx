import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getProfileDetail } from "src/apis/account-module";
import TutorProfilePageDetail from "src/components/EditProfile/TutorProfilePageDetail";
import Page401 from "src/components/error/Page401";
import Layout from "src/components/layout/Layout";
import { LIST_ROLE_KEY } from "src/constants/enumConstants";
import { useAuthContext } from "src/context/AuthContext";

function ProfilePage() {
  const { roleId } = useAuthContext();
  const [dataProfileDetail, setDataProfileDetail] = useState(undefined);

  useQuery({
    queryKey: ["profileDetail"],
    queryFn: async () => {
      const response = await getProfileDetail();
      setDataProfileDetail(response?.data);
      return response?.data;
    },
  });

  return (
    <Layout className="p-5 bg-[#F6F5FA]">
      {Number(roleId) === LIST_ROLE_KEY.TUTOR && (
        <TutorProfilePageDetail dataProfileDetail={dataProfileDetail} />
      )}
      {Number(roleId) === LIST_ROLE_KEY.STUDENT && (
        <TutorProfilePageDetail dataProfileDetail={dataProfileDetail} />
      )}
      {Number(roleId) === LIST_ROLE_KEY.ADMIN && (
        <TutorProfilePageDetail dataProfileDetail={dataProfileDetail} />
      )}
      {(Number(roleId) === LIST_ROLE_KEY.GUEST || !Number(roleId)) && (
        <Page401 />
      )}
    </Layout>
  );
}

export default ProfilePage;
