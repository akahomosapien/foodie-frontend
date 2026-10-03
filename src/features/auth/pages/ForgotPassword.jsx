import services from "@/api/services";
import { getErrorMessage } from "@/shared/utils/error";
import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  //  Step 1: Send OTP
  const handleSendOtp = async () => {
    try {
      setLoading(true);
      const res = await services.auth.sendOtp({ email });
      if (res.success) {
        alert(`OTP successfully sent to your email:${email}`);
        setStep(2);
      }
      setError("");
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  //  Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      const res = await services.auth.verifyOtp({ email, otp });
      if (res.success) {
        alert("OTP verified successfully!");
        setStep(3);
      }
      setError("");
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  //  Step 3: Reset Password
  const handleResetPassword = async () => {
    try {
      setLoading(true);
      if (newPassword !== confirmPassword) {
        alert("Password do not match");
        return;
      }

      const res = await services.auth.resetPassword({
        email,
        password: newPassword,
      });

      if (res.success) {
        alert("Password reset successfull!");
        navigate("/signin");
      }
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full items-center justify-center min-h-screen p-4 bg-purple-100">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        {/* Heading */}
        <div className="flex items-center gap-4">
          <IoIosArrowRoundBack
            // onClick={() => navigate("/signin")}
            size={30}
            className="text-purple-800 cursor-pointer"
          />
          <h1 className="text-2xl font-bold text-center text-purple-800">
            Forgot Password
          </h1>
        </div>

        {/* If step ===1 */}
        {step === 1 && (
          <div className="flex flex-col mt-10">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-2 border border-purple-200 rounded-lg text-base bg-purple-50/50 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:bg-white transition-all"
            />
            <button
              type="submit"
              className="disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none bg-linear-to-r from-purple-600 to-indigo-600 text-white mt-8 border-none rounded-lg py-3 text-lg font-semibold cursor-pointer transition-all hover:shadow-lg hover:shadow-purple-300/50 hover:scale-[1.02] active:scale-[0.98]"
              onClick={handleSendOtp}
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
            {error && <p className="text-red-500 text-center mt-2">*{error}</p>}
          </div>
        )}

        {/* If step ===2 */}
        {step === 2 && (
          <div className="flex flex-col mt-10">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-gray-700 mb-1"
            >
              OTP
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="px-4 py-2 border border-purple-200 rounded-lg text-base bg-purple-50/50 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              onClick={handleVerifyOtp}
              className="disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none bg-linear-to-r from-purple-600 to-indigo-600 text-white border-none rounded-lg py-3 text-lg font-semibold cursor-pointer transition-all hover:shadow-lg hover:shadow-purple-300/50 hover:scale-[1.02] active:scale-[0.98] mt-2"
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
            {error && <p className="text-red-500 text-center mt-2">*{error}</p>}
          </div>
        )}

        {/* If step ===3  */}
        {step === 3 && (
          <div className="w-full">
            <div className="flex flex-col mt-10">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="px-4 py-2 border border-purple-200 rounded-lg text-base bg-purple-50/50 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:bg-white transition-all"
              />
            </div>
            <div className="flex flex-col mt-5">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="px-4 py-2 border border-purple-200 rounded-lg text-base bg-purple-50/50 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:bg-white transition-all"
              />
            </div>
            <button
              type="submit"
              onClick={handleResetPassword}
              disabled={loading}
              className="disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none mt-10 w-full bg-linear-to-r from-purple-600 to-indigo-600 text-white border-none rounded-lg py-3 text-lg font-semibold cursor-pointer transition-all hover:shadow-lg hover:shadow-purple-300/50 hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? "Reseting..." : "Reset"}
            </button>
            {error && <p className="text-red-500 text-center mt-2">*{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
