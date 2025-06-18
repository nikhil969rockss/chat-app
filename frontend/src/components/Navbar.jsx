import {
  CircleUserRound,
  LogOutIcon,
  MessageSquare,
  Settings,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
 
  return (
    <header className="p-3 bg-base-100/30 border-b border-b-white/50 fixed top-0 left-0 z-40 w-full glass ">
      <nav className="container mx-auto w-full h-full flex justify-between items-center ">
        {/* logo */}

        <Link to={"/"} className="logo flex items-center gap-1">
          <span className="text-content bg-info/30 p-2 rounded-md">
            <MessageSquare />
          </span>
          <span className="text-[max(3vh,2vw)] text-base-content font-[600]">Chatty.</span>
        </Link>
        <div className=" flex gap-2">
          {/* links */}
          
          <Link to={"/setting"} className="hidden sm:flex items-center justify-center settings btn btn-sm">
            <span className="">
              <Settings />
            </span>
            <span>Settings</span>
          </Link>
          {authUser && (
            <Link
              to={"/profile"}
              className="hidden sm:flex items-center justify-center profile btn btn-sm"
            >
              <span>
                {!authUser.profilePic ? <CircleUserRound /> :
                  <div className="size-8  rounded-full p-1 overflow-hidden relative">
                    <img
                      className="w-full h-full object-cover"
                      src={authUser.profilePic}
                      alt="profile-pic"
                    />
                  </div>
                }
              </span>
              <span>Profile</span>
            </Link>
          )}
          {authUser && (
            <div
              onClick={() => logout()}
              className="flex items-center justify-center logout bg-black/30 btn btn-sm"
            >
              <span>
                <LogOutIcon />
              </span>
              <span>Logout</span>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
