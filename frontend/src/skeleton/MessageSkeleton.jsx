const MessageSkeleton = () => {
  return (
    <div className="w-full p-2 h-[63vh]">
      {[...Array(3)].map((s, i) => (
        <div key={i}>
          <div className="chat chat-start ">
            <div className="chat-image avatar ">
              <div className="size-10 rounded-full bg-base-100 skeleton"></div>
            </div>
            <div className="chat-header w-[20%] bg-base-100/50 h-2 mb-1 skeleton"></div>
            <div className="chat-bubble w-[50%] bg-base-100 skeleton"></div>
            <div className="chat-footer opacity-50 w-[25%] h-2 mt-1 bg-base-100 skeleton"></div>
          </div>
          <div className="chat chat-end">
            <div className="chat-image avatar ">
              <div className="size-10 rounded-full bg-base-100 skeleton"></div>
            </div>
            <div className="chat-header w-[20%] bg-base-100/50 h-2 mb-1 skeleton "></div>
            <div className="chat-bubble w-[50%] bg-base-100 skeleton"></div>
            <div className="chat-footer opacity-50 w-[25%] h-2 mt-1 bg-base-100 skeleton"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default MessageSkeleton;
