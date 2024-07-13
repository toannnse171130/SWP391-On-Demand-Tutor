import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getProfileDetail } from "src/apis/account-module";
import TutorEditProfile from "src/components/EditProfile/TutorEditProfile";
import Page401 from "src/components/error/Page401";
import Layout from "src/components/layout/Layout";
import { LIST_ROLE_KEY } from "src/constants/enumConstants";
import { useAuthContext } from "src/context/AuthContext";

function EditProfilePage() {
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
        <TutorEditProfile
          dataProfileDetail={dataProfileDetail}
          setDataProfileDetail={setDataProfileDetail}
        />
      )}
      {Number(roleId) === LIST_ROLE_KEY.STUDENT && (
        <TutorEditProfile
          dataProfileDetail={dataProfileDetail}
          setDataProfileDetail={setDataProfileDetail}
        />
      )}
      {Number(roleId) === LIST_ROLE_KEY.ADMIN && (
        <TutorEditProfile
          dataProfileDetail={dataProfileDetail}
          setDataProfileDetail={setDataProfileDetail}
        />
      )}
      {(Number(roleId) === LIST_ROLE_KEY.GUEST || !Number(roleId)) && (
        <Page401 />
      )}
    </Layout>
  );
}

export default EditProfilePage;
