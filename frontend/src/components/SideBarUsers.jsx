import { Users } from "lucide-react";
import User from "./User";
import { userMessageStore } from "../store/useMessageStore";
import { useEffect, useState } from "react";
import SideBarUsersSkeleton from "../skeleton/SideBarUsersSkeleton";
import { useAuthStore } from "../store/useAuthStore";

const SideBarUsers = ({ setShowMessagesMobile }) => {
  const { users, isLoadingUsers, getUsers } = userMessageStore();
  const { onlineUsers } = useAuthStore();
  useEffect(() => {
    getUsers();
  }, []);

  // online users states for filtering online users

  const [showOnlineUsers, setShowOnlineUsers] = useState(false);

  const filteredUsers = showOnlineUsers
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;
  

    // loading UI if no users is there
  if (isLoadingUsers) {
    return <SideBarUsersSkeleton />;
  }

  return (
    <aside className=" w-full h-full flex flex-col  ">
      <header className="  bg-base-300 p-3 shadow-md">
        <nav className="flex flex-col gap-2 text-base-content">
          {/* contact logo */}

          <div className="flex gap-1">
            <Users />
            <p className="font-[600]">Contacts</p>
          </div>

          {/* checkbox */}
          <div className="text-base-content flex text-sm items-center gap-2 ">
            <input
              id="online"
              className="checkbox size-4 border-base-content cursor-pointer"
              type="checkbox"
              checked={showOnlineUsers}
              onChange={(e) => setShowOnlineUsers(e.target.checked)}
            />
            <label className="cursor-pointer" htmlFor="online">
              Show online only{" "}
            </label>
            <span className="cursor-auto text-xs">
              ({onlineUsers.length - 1} online)
            </span>
          </div>
        </nav>
      </header>
      {/* users lists */}
      <div className="flex-1 overflow-y-auto">
      {filteredUsers.map((user) => (
        
        <User
          key={user._id}
          user={user}
          setShowMessagesMobile={setShowMessagesMobile}
        />
      ))}
      </div>
      {filteredUsers.length === 0 && <div className="text-center text-sm capitalize text-base-content">no online Users</div>}
    </aside>
  );
};
export default SideBarUsers;
