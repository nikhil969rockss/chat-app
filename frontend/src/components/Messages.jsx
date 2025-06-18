import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { userMessageStore } from "../store/useMessageStore";

const Messages = ({ message }) => {
  const { selectedUser, messages } = userMessageStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  //Auto scroll to message
  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <div className="p-1">
      <div
        className={`chat ${
          message.senderID === authUser._id ? "chat-end" : "chat-start"
        }`}
        ref={messageEndRef}
      >
        <div className=" chat-image avatar">
          <div className="size-10 rounded-full border">
            <img
              src={
                message.senderID === authUser._id
                  ? authUser?.profilePic || "/avatar.png"
                  : selectedUser?.profilePic || "/avatar.png"
              }
              alt="profile pic"
            />
          </div>
        </div>
        <div className="chat-header mb-1">
          <time className="text-xs opacity-50 ml-1">
            {new Date(message.createdAt).toDateString()}, &nbsp;
            {new Date(message.createdAt).toLocaleTimeString("en-us", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </time>
        </div>
        <div className="chat-bubble flex flex-col">
          {message.image && (
            <img
              src={message.image}
              alt="Attachment"
              className="sm:max-w-[200px] rounded-md mb-2"
            />
          )}
          {message.text && <p>{message.text}</p>}
        </div>
      </div>
    </div>
  );
};
export default Messages;
