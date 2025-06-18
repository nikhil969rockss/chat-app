import { Image, Send, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { userMessageStore } from "../store/useMessageStore";

const ChatInput = () => {
  const { sendMessage } = userMessageStore();
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(false);

  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("please select a image file");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      await setImage(base64Image);
    };
    setPreviewImage(true);
  };

  const removePreviewImage = () => {
    setImage(null);
    setPreviewImage(false);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!text && !image) {
      return;
    } else {
      try {
        sendMessage({
          text: text.trim(),
          image: image,
        });
        // clear the formStates
        setImage(null);
        setText("");
        setPreviewImage(false);
      } catch (error) {
        console.log(`Error sending message `, error);
        toast.error(
          error.response.data.message ||
            "failed to send message or file must be larger than 10MB"
        );
      }
    }
  };

  return (
    <div
      className={`  w-full p-2  `}
    >
      {previewImage && (
        <div className="w-full mb-2">
          <div className="img-preview w-20 h-20  relative ">
            <img
              className="w-full h-full object-cover rounded-md border border-secondary "
              src={image}
              alt="preview"
            />
            <span
              onClick={removePreviewImage}
              className="absolute z-10 top-[-5%] right-[-5%] cursor-pointer bg-base-300 rounded-full flex justify-center items-center  size-5"
            >
              <X size={18} />
            </span>
          </div>
        </div>
      )}
      <form onSubmit={handleSendMessage} className="flex item-center gap-1 ">
        <input
          placeholder="Type a Message..."
          type="text"
          name=""
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 px-2 py-1 outline-none border rounded-md border-base-content"
        />
        <label className="cursor-pointer flex items-center" htmlFor="image">
          <span
            className={`${
              previewImage ? "text-emerald-400" : "text-zinc-400"
            } hover:bg-base-300 p-2 rounded-full hover:text-base-content transition-all duration-300`}
          >
            <Image />
          </span>
        </label>
        <input
          onChange={handleSelectImage}
          id="image"
          className="hidden"
          type="file"
          accept="image/*"
        />
        <button
          type="submit"
          className={`flex items-center cursor-pointer transition-all duration-300 hover:bg-base-300 hover:text-base-content rounded-full p-2 ${
            text.length > 0 || previewImage
              ? "text-emerald-400"
              : "text-zinc-400"
          }`}
        >
          <Send />
        </button>
      </form>
    </div>
  );
};
export default ChatInput;
