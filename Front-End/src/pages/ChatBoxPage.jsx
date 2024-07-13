import React from "react";
import ChatBoxDetail from "src/components/ChatBox/ChatBoxDetail";
import Page401 from "src/components/error/Page401";
import Layout from "src/components/layout/Layout";
import { LIST_ROLE_KEY } from "src/constants/enumConstants";
import { useAuthContext } from "src/context/AuthContext";

function ChatBoxPage() {
  const { roleId } = useAuthContext();
  return (
    <Layout className="p-5 bg-[#F6F5FA]">
      {Number(roleId) === LIST_ROLE_KEY.TUTOR ||
      Number(roleId) === LIST_ROLE_KEY.STUDENT ? (
        <ChatBoxDetail />
      ) : (
        <Page401 />
      )}
    </Layout>
  );
}

export default ChatBoxPage;
