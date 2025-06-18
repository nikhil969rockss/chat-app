import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { EyeIcon, EyeOffIcon, Loader, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";

const SignupPage = () => {
  const { isSigningUp, signup } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",

    email: "",

    password: "",
  });
  const btn = isSigningUp ? <Loader className="animate-spin" /> : "Submit";
  const validateFormData = () => {
    if (!formData.fullName || !formData.email || !formData.password)
      return toast.error("All fields are required");
    if (formData.fullName.length < 3 || formData.fullName.length > 30)
      return toast.error("Full Name must be between 3 to 30 character");
    if (formData.password.length < 6)
      return toast.error("Password should at least have 6 character");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateFormData();
    if (success)
      signup({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        password: formData.password.trim(),
      });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main className=" min-h-screen grid lg:grid-cols-2  ">
      <aside className="col-span-1 p-6 lg:p-12 flex justify-center items-center flex-col ">
        {/* left side */}
        <div className="flex flex-col items-center justify-center w-full     ">
          <div className="icon bg-info/30 p-2 rounded-md">
            <MessageSquare size={32} className="text-content" />
          </div>
          <h2 className="text-[max(4vh,2vw)] text-content  capitalize font-[600]">
            create Account
          </h2>
          <p className="text-[#696F77]">Get started with your free account</p>
        </div>

        {/* form */}

        <form className=" w-full max-w-md" onSubmit={handleSubmit}>
          <div className="fullName w-full">
            <label
              htmlFor="fullName"
              className="text-sm text-[#c1cddd] ml-1 mb-1 inline-block"
            >
              Full Name
            </label>
            <label className="input validator w-full ">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className=""
                required
                placeholder="John Doe"
                minLength="3"
                maxLength="30"
                value={formData.fullName}
                onChange={handleChange}
              />
            </label>

            <p className="validator-hint">Must be 3 to 30 characters</p>
          </div>
          <div className="email ">
            <label
              htmlFor="email"
              className="text-sm text-[#c1cddd] ml-1 mb-1 inline-block"
            >
              Email
            </label>
            <label className="input validator w-full">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                name="email"
                v
                value={formData.email}
                onChange={handleChange}
              />
            </label>
            <div className="validator-hint ">Enter valid email address</div>
          </div>
          <div className="password mb-3">
            <label
              htmlFor="email"
              className="text-sm text-[#c1cddd] ml-1 mb-1 inline-block"
            >
              Password
            </label>
            <label className="input validator w-full">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                type={!showPassword ? "password" : "text"}
                required
                placeholder="Password"
                minLength="6"
                value={formData.password}
                name="password"
                onChange={handleChange}
              />
              <span
                className="text-white/40"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="cursor-pointer" />
                ) : (
                  <EyeIcon className="cursor-pointer" />
                )}
              </span>
            </label>
            <p className="validator-hint ">Minimum 6 characters</p>
          </div>
          <button
            disabled={isSigningUp}
            className={`${
              isSigningUp
                ? "cursor-not-allowed w-full flex items-center justify-center "
                : "cursor-pointer w-full flex items-center justify-center"
            } "w-full bg-primary text-primary-content font-[600] p-2 rounded-md "`}
          >
            {btn}
          </button>
        </form>
        <p className="text-[#696F77] mt-4">
          Already have an Account{" "}
          <span className="underline text-blue-400 cursor-pointer">
            <Link to={"/login"}>Login</Link>
          </span>
        </p>
      </aside>
      <aside className="col-span-1 flex flex-col justify-center items-center">
        {/* Right side */}
        {/* animation pattern */}
        <AuthImagePattern
          title={"Join our community"}
          subtitle={
            "Connect with friends, share moments, stay in touch with your loved ones"
          }
        />
      </aside>
    </main>
  );
};
export default SignupPage;
