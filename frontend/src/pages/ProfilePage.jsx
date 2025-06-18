import { Camera, Mail, UserIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";

const ProfilePage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);

      await updateProfile({ profilePic: base64Image });
    };
  };
 
  return (
    <main className="w-full min-h-screen pt-24 bg-base-100 pb-5 ">
      <div className="max-w-lg mx-auto  p-4 py-8 bg-base-200 rounded-lg flex flex-col items-center">
        <h2 className="text-[max(3vh,1.5vw)] font-[600]">Profile</h2>
        <p className="text-sm mt-2 text-base-content">Your Profile information</p>
        <div className="img-div p-1 border rounded-full bg-base-content mt-4 relative">
          <div className="size-28 rounded-full border-3 border-black overflow-hidden ">
            <img
              src={selectedImage || authUser.profilePic || "/avatar.png"}
              alt="profile"
              className="w-full h-full object-cover"
            />
            <label
              htmlFor="file"
              className="absolute bottom-0 right-2 cursor-pointer"
              
            >
              <Camera
                size={28}
                className="text-base-300 bg-base-content p-1 rounded-full"
              />
            </label>
            <input
              onChange={handleImageUpload}
              id="file"
              type="file"
              className="hidden"
              disabled={isUpdatingProfile}
            />
          </div>
        </div>
        <p className="mt-2 text-sm text-base-content">
         { !isUpdatingProfile? "Click the camera icon to update your photo":"Uploading..."}
        </p>
        <div className="name-email flex flex-col w-full text-accent mt-8 gap-4">
          <div>
            <label className="flex items-center gap-1 mb-1 text-sm" htmlFor="">
              <UserIcon size={16} />
              Full Name{" "}
            </label>
            <input
              className="w-full p-2 outline-none rounded-md border border-primary-content"
              value={authUser?.fullName}
              type="text"
              readOnly
            />
          </div>
          <div>
            <label className="flex items-center gap-1 mb-1 text-sm" htmlFor="">
              <Mail size={16} />
              Email Address{" "}
            </label>
            <input
              className="w-full p-2 outline-none rounded-md border border-primary-content"
              value={authUser?.email}
              type="text"
              readOnly
            />
          </div>
        </div>
        <div className="account-information flex flex-col gap-3 w-full mt-8 text-base-content px-3">
          <h3 className="">Account Information</h3>
          <div className="w-full flex justify-between items-center border-b border-b-white/30 p-1 text-sm">
            <p>Member Since</p>
            <p>{authUser?.createdAt.split("T")[0]}</p>
          </div>
          <div className="w-full flex justify-between items-center p-1 text-sm">
            <p>Account Status</p>
            <p className="text-green-400 flex gap-1 items-center">
              <span className="size-3 inline-block rounded-full bg-green-500"></span>
              Active
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
export default ProfilePage;
