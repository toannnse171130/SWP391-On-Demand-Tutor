import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  getChatAccountDetail,
  getListChatAccount,
  sendNewChat,
} from "src/apis/account-module";
import { useAuthContext } from "src/context/AuthContext";
import PrimaryBtn from "../common/PrimaryBtn";
import { toast } from "react-toastify";
import { combineStrings } from "src/libs";
import { format } from "date-fns";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { chatSignalUrl } from "src/constants/APIUrls";

function ChatBoxDetail() {
  const { userId } = useAuthContext();
  const [listMessage, setListMessage] = useState(undefined);
  const [messageSelected, setMessageSelected] = useState(undefined);
  const [currentMessageDetail, setCurrentMessageDetail] = useState(undefined);
  const [newMessage, setNewMessage] = useState(null);
  const [isProgress, setIsProgress] = useState(false);
  const [signalRConnection, setSignalRConnection] = useState(undefined);
  useQuery({
    queryKey: ["getListChats"],
    queryFn: async () => {
      const response = await getListChatAccount();
      setListMessage(response?.data);
      return response?.data;
    },
  });

  useQuery({
    queryKey: ["getChatAccountDetail", messageSelected?.id],
    queryFn: async () => {
      const response = await getChatAccountDetail(messageSelected?.id);
      setCurrentMessageDetail(response?.data);
      return response?.data;
    },
    enabled: !!messageSelected?.id,
  });

  const sendChatMutation = useMutation(
    async (data) => {
      return await sendNewChat(data);
    },
    {
      onSuccess: (data) => {
        setNewMessage(null);
        if (data?.status >= 200 && data?.status < 300) {
          toast.success("Gửi tin nhắn thành công");
          setIsProgress(false);
        } else {
          toast.error(
            combineStrings(data?.response?.data?.errors) ||
              combineStrings(data?.response?.data?.message) ||
              combineStrings(data?.response?.data) ||
              combineStrings(data?.message) ||
              "Oops! Something went wrong..."
          );
          setIsProgress(false);
        }
      },
      onError: (err) => {
        toast.error(
          // @ts-ignore
          err?.response?.data?.message || err?.message || "Update error"
        );
        setIsProgress(false);
      },
    }
  );
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendNewMessage();
    }
  };

  const handleSendNewMessage = () => {
    const submitObj = {
      to: messageSelected?.id,
      content: newMessage,
    };
    setIsProgress(true);
    // @ts-ignore
    sendChatMutation.mutate(submitObj);
  };

  const queryClient = useQueryClient();

  // handle signar r
  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(chatSignalUrl)
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    setSignalRConnection(newConnection);
  }, []);

  useEffect(() => {
    if (signalRConnection && userId) {
      signalRConnection
        .start()
        .then(() => {
          signalRConnection
            .invoke("JoinGroup", String(userId))
            .catch((error) => console.log("INVOKE ERROR: ", error));
          signalRConnection.on("ReceiveMessage", (message) => {
            console.log("RECEIVE MESSASGE: ", message);
            queryClient.invalidateQueries(["getListChats"]);
            queryClient.invalidateQueries(["getChatAccountDetail"]);
          });
        })
        .catch((error) => console.error("Connection failed: ", error));
    }
  }, [signalRConnection, userId]);

  return (
    <div className="flex">
      <div
        className="w-1/4 overflow-y-auto bg-white border-r border-gray-300"
        style={{ height: "calc(100vh - 200px)" }}
      >
        <header className="flex items-center justify-between p-4 text-white bg-indigo-600 border-b border-gray-300">
          <h1 className="text-2xl font-semibold">Chat trực tuyến</h1>
        </header>

        <div className="p-3">
          {listMessage?.length > 0 ? (
            listMessage?.map((item) => (
              <div
                key={item?.id}
                className={`flex items-center p-2 mb-3 rounded-md cursor-pointer hover:bg-grayLight ${
                  item?.id === messageSelected?.id && "bg-grayLight"
                }`}
                onClick={() => {
                  setMessageSelected(item);
                }}
              >
                <div className="w-12 h-12 mr-3 bg-gray-300 rounded-full">
                  <img
                    src={
                      item?.avatar ||
                      "https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                    }
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">
                    {item?.fullName || "---"}
                  </h2>
                  <p className="text-gray-600 truncate-2-line">
                    {item?.lastMessage}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div>Không có tin nhắn</div>
          )}
        </div>
      </div>

      <div className="flex-1">
        {messageSelected ? (
          <div className="relative flex flex-col h-full gap-5">
            <div
              className="overflow-y-auto bg-[#f3f4f6]"
              style={{ height: "calc(100vh - 200px - 66px)" }}
            >
              <header className="sticky top-0 left-0 right-0 p-4 text-gray-700 bg-white border border-grayLight">
                <h1 className="text-2xl font-semibold">
                  {messageSelected?.fullName || "---"}
                </h1>
              </header>

              <div className="p-4">
                {currentMessageDetail?.map((item) => {
                  if (item?.from === Number(userId)) {
                    return (
                      <div
                        id="to"
                        className="flex justify-end mb-3 cursor-pointer"
                      >
                        <div className="flex flex-col gap-2 p-3 text-white bg-indigo-500 rounded-lg max-w-96">
                          <p>{item?.content} too</p>
                          <div className="text-xs text-end text-grayLight">
                            {item?.time
                              ? format(new Date(item?.time), "hh:mm")
                              : "-"}
                          </div>
                        </div>
                        <div className="flex items-center justify-center ml-2 rounded-full w-9 h-9">
                          <img
                            src={
                              (item?.from === Number(userId)
                                ? item?.fromNavigation?.avatar
                                : item?.toNavigation?.avatar) ||
                              "https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                            }
                            alt="My Avatar"
                            className="w-8 h-8 rounded-full"
                          />
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div id="from" className="flex mb-3 cursor-pointer">
                        <div className="flex items-center justify-center mr-2 rounded-full w-9 h-9">
                          <img
                            src={
                              (item?.from !== Number(userId)
                                ? item?.fromNavigation?.avatar
                                : item?.toNavigation?.avatar) ||
                              "https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                            }
                            alt="User Avatar"
                            className="w-8 h-8 rounded-full"
                          />
                        </div>
                        <div className="flex flex-col gap-2 p-3 bg-white rounded-lg max-w-96">
                          <p className="text-gray-700">{item?.content} fromm</p>
                          <div className="text-xs text-end text-gray">
                            {item?.time
                              ? format(new Date(item?.time), "hh:mm")
                              : "-"}
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div className="px-4 bg-white">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Nhập tin nhắn"
                  className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                  }}
                  onKeyPress={handleKeyPress}
                  value={newMessage || ""}
                />
                <PrimaryBtn
                  disabled={!newMessage || isProgress}
                  className="!px-4 !py-2 ml-2 text-white !rounded-md !w-fit"
                  onClick={handleSendNewMessage}
                >
                  Gửi
                </PrimaryBtn>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="flex items-center justify-center"
            style={{ height: "calc(100vh - 200px)" }}
          >
            Chọn tin nhắn để tiếp tục
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatBoxDetail;
