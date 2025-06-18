import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { EyeIcon, EyeOffIcon, Loader, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";

const LoginPage = () => {
  const { isLogging, login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [formData, setFormData] = useState({
    email: "",

    password: "",
  });
  const btn = isLogging ? <Loader className="animate-spin" /> : "Submit";

  const validateFormData = () => {
    if (!formData.email || !formData.password) {
      return toast.error("All fields are required");
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateFormData();
    if (success) {
      login({
        email: formData.email.trim(),
        password: formData.password.trim(),
      });
    }
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
          {/* logo */}

          <div className="icon bg-info/30 p-2 rounded-md">
            <MessageSquare size={32} className="text-content" />
          </div>
          <h2 className="text-[max(4vh,2vw)] text-content  capitalize font-[600]">
            Welcome Back 👋
          </h2>
          <p className="text-content">Sign in to your Account</p>
        </div>
        {/* form */}

        <form className=" w-full max-w-md" onSubmit={handleSubmit}>
          <div className="email mt-4 ">
            <label
              htmlFor="email"
              className="text-sm text-[#c1cddd] ml-1 mb-1 inline-block"
            >
              Email
            </label>
            <label className={`input validator  w-full `}>
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
                pattern="^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
                value={formData.email}
                title="please enter a valid email"
                onChange={handleChange}
              />
            </label>
            {
              <p className="validator-hint hidden ">
                Please enter a valid email
              </p>
            }
          </div>
          <div className="password mt-4">
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
                className="text-base-content/40"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="cursor-pointer" />
                ) : (
                  <EyeIcon className="cursor-pointer" />
                )}
              </span>
            </label>
            {passwordError && (
              <p className="text-sm mt-2 text-red-400/70 ">
                Enter at least 6 character
              </p>
            )}
          </div>
          <button
            disabled={isLogging}
            className={`${
              isLogging
                ? "cursor-not-allowed w-full flex items-center justify-center mt-8"
                : "cursor-pointer w-full flex items-center justify-center mt-8"
            } "w-full bg-primary text-primary-content font-[600] p-2 rounded-md "`}
          >
            {btn}
          </button>
        </form>
        <p className="text-[#696F77] mt-4">
          Don't have an Account{" "}
          <span className="underline text-blue-400 cursor-pointer">
            <Link to={"/signup"}>Create Account</Link>
          </span>
        </p>
      </aside>
      <aside className="col-span-1 flex flex-col justify-center items-center">
        {/* right side */}
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
export default LoginPage;
