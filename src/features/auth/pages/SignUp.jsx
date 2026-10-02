import services from "@/api/services";
import { getErrorMessage } from "@/shared/utils/error";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    role: "user", //default role
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleSelect = (selectedRole) => {
    setFormData((prev) => ({
      ...prev,
      role: selectedRole.toLowerCase().replace(" ", ""),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await services.auth.signup(formData);
      if (res.success) {
        console.log("Success!");
        alert("Account created successfully!");
        setError("");
        setFormData({
          fullName: "",
          email: "",
          mobile: "",
          password: "",
          role: "user", // default role
        });
      }
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = () => {};

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-purple-50 to-indigo-100 p-5 font-sans">
      <div className="bg-white rounded-2xl shadow-xl shadow-purple-200/50 p-10 max-w-md w-full">
        {/* heading */}
        <h1 className="text-4xl font-bold bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent text-center mb-2">
          Foodie
        </h1>

        {/* subheading */}
        <p className="text-base text-gray-600 text-center mb-7 leading-relaxed">
          Create your account to get started with delicious food deliveries
        </p>

        {/* signup-form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* FullName */}
          <div className="flex flex-col">
            <label
              htmlFor="fullName"
              className="text-sm font-semibold text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="px-4 py-2 border border-purple-200 rounded-lg text-base bg-purple-50/50 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:bg-white transition-all"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="px-4 py-2 border border-purple-200 rounded-lg text-base bg-purple-50/50 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:bg-white transition-all"
            />
          </div>

          {/* Mobile */}
          <div className="flex flex-col">
            <label
              htmlFor="mobile"
              className="text-sm font-semibold text-gray-700 mb-1"
            >
              Mobile
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              placeholder="Enter your Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="px-4 py-2 border border-purple-200 rounded-lg text-base bg-purple-50/50 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:bg-white transition-all"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={`${showPassword ? "text" : "password"}`}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-purple-200 rounded-lg text-base bg-purple-50/50 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:bg-white transition-all"
              />
              <button
                type="button"
                className="absolute top-3 right-3 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {!showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          {/* Role */}
          <div className="flex flex-col">
            <label
              htmlFor="role"
              className="text-sm font-semibold text-gray-700 mb-1"
            >
              Role
            </label>

            <div className="flex gap-2">
              {["User", "Owner", "Delivery Boy"].map((r) => (
                <button
                  key={r} // Added key prop
                  type="button" // Added type="button" to prevent form submission
                  className=" flex-1 text-white rounded-lg py-2 text-m font-semibold cursor-pointer transition-all hover:shadow-lg hover:shadow-purple-300/50 hover:scale-[1.02] active:scale-[0.98] mt-2"
                  style={
                    formData.role == r.toLowerCase().replace(" ", "")
                      ? {
                          backgroundColor: "purple",
                          color: "white",
                          backgroundImage:
                            "linear-gradient(to right, #9333ea, #4f46e5)",
                        }
                      : { border: "1px solid black", color: "#333" }
                  }
                  onClick={() => handleRoleSelect(r)}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="bg-linear-to-r from-purple-600 to-indigo-600 text-white border-none rounded-lg py-3 text-lg font-semibold cursor-pointer transition-all hover:shadow-lg hover:shadow-purple-300/50 hover:scale-[1.02] active:scale-[0.98] mt-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center text-center justify-center gap-3">
                <ClipLoader className="mt-2" size={25} />{" "}
                <span>Signing up...</span>
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
          {error && <p className="text-red-500 text-center mt-2">*{error}</p>}
        </form>

        {/* Or */}
        <div className="flex items-center my-3">
          <div className="flex-1 border-b border-purple-200"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-1 border-b border-purple-200"></div>
        </div>

        {/* Google-signup-button     */}
        <button
          onClick={handleGoogleSignUp}
          type="button"
          className="flex items-center justify-center gap-2.5 bg-white text-gray-700 border-2 border-purple-200 rounded-lg py-3 px-4 text-base font-medium cursor-pointer transition-all hover:bg-purple-50 hover:border-purple-400 hover:shadow-md w-full"
        >
          {/* Google Logo SVG */}
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Sign up with Google
        </button>

        {/* ALready have an account */}
        <p className="text-center mt-3">
          Already have an account?
          <span
            className="text-purple-600 px-2 cursor-pointer"
            // onClick={() => navigate("/signin")}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
