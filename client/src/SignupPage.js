import { useState } from "react";
import axios from "axios";
const SignupPage = ({ onSignup }) => {
  const [email, setEmail] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const sendOtp = async () => {
    try {
      const response = await axios.post("http://localhost:5000/send-otp", { email });
      alert(response.data.message);
      setIsOtpSent(true);
    } catch (error) {
      alert(error.response?.data?.message || "Error sending OTP");
    }
  };

  const verifyOtp = async () => {
    try {
       await axios.post("http://localhost:5000/verify-otp", { email, otp });
      alert("Email-Verified-Suucesfully");
      onSignup(email); 
    } catch (error) {
        console.error(error);
      alert(error.response?.data?.message || "Error verifying OTP");
    }
  };

  return (



      <div className="flex items-center justify-center w-full md:w-1/2 bg-white p-8">
        <div className="w-full max-w-md space-y-6 animate-slideUp">
          <h2 className="text-3xl font-bold text-gray-800 text-center">Welcome</h2>
          <p className="text-sm text-gray-500 text-center">Enter your email to continue.</p>
          <form className="space-y-4">
            {/* Email Input */}
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              disabled={isOtpSent} // Disable email input after OTP is sent
            />

            {/* OTP Input (Visible only after OTP is sent) */}
            {isOtpSent && (
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            )}

            {/* Button */}
            <button
              type="button"
              onClick={isOtpSent ? verifyOtp : sendOtp}
              className="w-full px-4 py-3 font-semibold text-white bg-indigo-500 rounded hover:bg-indigo-600 transition duration-300 ease-in-out"
            >
              {isOtpSent ? "Verify OTP" : "Send OTP"}
            </button>
          </form>
        </div>
      </div>
    
  );
};
export default SignupPage;
