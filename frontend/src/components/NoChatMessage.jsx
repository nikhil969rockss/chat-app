import { MessageSquare } from "lucide-react";

const NoChatMessage = () => {
  return (
    <div className="h-full w-full flex justify-center  items-center bg-primary/10">
      {/* skeleton content */}

      <div className="flex flex-col items-center gap-3">
        {/* logo */}

        <span className="text-content bg-info/30 p-2 rounded-md animate-bounce">
          <MessageSquare className="" size={40} />
        </span>

        {/* title */}
        <h2 className="text-[max(3vh,2.8vh)]">Welcome to Chatty</h2>
        <p className="text-center hidden sm:block">
          Select a conversation from Sidebar to start Chatting
        </p>
        <p className="text-center  sm:hidden">
          Select a conversation from messages icon to start Chatting
        </p>
      </div>
    </div>
  );
};
export default NoChatMessage;
