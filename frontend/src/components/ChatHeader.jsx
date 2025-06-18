import { X } from "lucide-react";
import { userMessageStore } from "../store/useMessageStore";
import { useAuthStore } from "../store/useAuthStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUserNull } = userMessageStore();
  const { onlineUsers } = useAuthStore();
  return (
    <div className="w-full sticky top-0 left-0 z-[20] min-h-14 p-2 flex items-center justify-between shadow-md">
      {/* logo and name */}
      <div className="flex gap-1 items-center">
        <div className="logo size-14 rounded-full overflow-hidden ">
          <img
            className="w-full h-full object-cover"
            src={selectedUser.profilePic || "/avatar.png"}
            alt=""
          />
        </div>
        <div className="details flex flex-col  ">
          <p>{selectedUser.fullName}</p>
          <p className="text-sm capitalize">
            {onlineUsers.includes(selectedUser._id) ? "online" : "offline"}
          </p>
        </div>
      </div>

      {/* close button */}
      <button onClick={() => setSelectedUserNull()} className="cursor-pointer">
        <X />
      </button>
    </div>
  );
};
export default ChatHeader;
