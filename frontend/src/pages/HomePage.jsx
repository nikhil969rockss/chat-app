import { Camera, MessageSquare, MessagesSquare } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { userMessageStore } from "../store/useMessageStore";
import SideBarUsers from "../components/SideBarUsers";
import NoChatMessage from "../components/NoChatMessage";
import ChatContainer from "../components/ChatContainer";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [showMessagesMobile, setShowMessagesMobile] = useState(false);
  const { selectedUser, setSelectedUserNull } = userMessageStore();
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
    return () => {
      setSelectedUserNull();
    };
  }, []);

  return (
    <main className="h-screen pt-24 px-3 py-2">
      <div className="container h-full sm:h-[calc(100vh-8rem)] mx-auto max-w-6xl bg-base-200/50 flex relative sm:overflow-hidden rounded-2xl transition-all duration-300 ">
        {/* sidebar */}
        <div
          className={`overflow-y-scroll overflow-x-clip max-w-sm h-full absolute -left-80 sm:relative  sm:block  sm:min-w-[300px] transition-all duration-300 ${
            showMessagesMobile ? "z-40 left-0 " : "-left-80  sm:left-0 "
          }   `}
        >
          <SideBarUsers setShowMessagesMobile={setShowMessagesMobile} />
        </div>

        <div className="w-full h-full bg-primary/10  ">
          {/* icon to toggle sidebar */}
          <span
            onClick={() => setShowMessagesMobile(!showMessagesMobile)}
            className="absolute top-[-5%] left-1 flex items-center gap-1 bg-secondary text-secondary-content  px-2 py-1 rounded-md cursor-pointer sm:hidden"
          >
            <MessagesSquare />
            messages
          </span>

          {!selectedUser ? (
            <span onClick={() => setShowMessagesMobile(false)}>
              {" "}
              <NoChatMessage />{" "}
            </span>
          ) : (
            <span onClick={() => setShowMessagesMobile(false)}>
              <ChatContainer />
            </span>
          )}
        </div>
      </div>
    </main>
  );
};
export default HomePage;
