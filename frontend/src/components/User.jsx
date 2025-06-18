import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { userMessageStore } from "../store/useMessageStore";

const User = ({ user, setShowMessagesMobile }) => {
  const { selectedUser, setSelectedUser, setSelectedUserNull } =
    userMessageStore();

  const { onlineUsers, checkAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  //   escape button to cancel the user
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === `Escape`) {
        setSelectedUserNull();
      }
    });
  }, []);
  const handleUserClick = (user) => {
    setSelectedUser(user);

    setShowMessagesMobile(false); // for mobile view
  };

  return (
    <button
      onClick={() => handleUserClick(user)}
      className={`  p-3 cursor-pointer flex items-center gap-2 w-full ${
        selectedUser?._id === user?._id
          ? "bg-base-200 ring-1 ring-base-300 "
          : ""
      } `}
    >
      {/* userProfile */}
      <div className="  size-14 relative ">
        <img
          src={user.profilePic || "/avatar.png"}
          className="w-full h-full rounded-full border object-cover"
          alt=""
        />
        {onlineUsers.includes(user._id) && (
          <div className="absolute inline-block size-3 bg-success rounded-full z-10 top-[-2px] right-[8px]"></div>
        )}
      </div>

      {/* name/status-div */}
      <div className="flex flex-col items-start ">
        <p className="text-base-content capitalize font-bold">
          {user?.fullName}
        </p>
        <p
          className={`text-xs capitalize ${
            onlineUsers.includes(user._id)
              ? "text-success"
              : "text-base-content"
          } `}
        >
          {onlineUsers.includes(user._id) ? "online" : "offline"}
        </p>
      </div>
    </button>
  );
};
export default User;
