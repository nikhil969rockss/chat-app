import { useEffect } from "react";
import MessageSkeleton from "../skeleton/MessageSkeleton";
import { userMessageStore } from "../store/useMessageStore";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { useAuthStore } from "../store/useAuthStore";

const ChatContainer = () => {
  const {
    selectedUser,
    isLoadingMessages,
    getMessages,
    messages,
    subscribeToMessage,
    unsubscribeFromMessage,
  } = userMessageStore();

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessage();
    return () => {
      unsubscribeFromMessage();
    };
  }, [selectedUser]);

  if (isLoadingMessages) {
    return (
      <div className="w-full h-full">
        <ChatHeader />
        <MessageSkeleton />
        <ChatInput />
      </div>
    );
  }
  return (
    <div className="w-full h-full flex flex-col ">
      <ChatHeader />

      <div className="overflow-y-scroll flex-1 px-4  ">
        {messages.length > 0
          ? messages.map((message) => (
              <Messages key={message._id} message={message} />
            ))
          : <div className="w-full h-full flex justify-center items-center animate-pulse"> send a message to start chatting</div>}
      </div>
      <ChatInput />
    </div>
  );
};
export default ChatContainer;
