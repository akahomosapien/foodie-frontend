import apiClient from "./apiClient";
import ENDPOINTS from "./endpoints";

const services = {
  auth: {
    signup: (data) => apiClient.post(ENDPOINTS.AUTH.SIGNUP, data),
    signin: (data) => apiClient.post(ENDPOINTS.AUTH.SIGNIN, data),
    signout: () => apiClient.get(ENDPOINTS.AUTH.SIGNOUT),
    sendOtp: (data) => apiClient.post(ENDPOINTS.AUTH.SEND_OTP, data),
    verifyOtp: (data) => apiClient.post(ENDPOINTS.AUTH.VERIFY_OTP, data),
    resetPassword: (data) =>
      apiClient.post(ENDPOINTS.AUTH.RESET_PASSWORD, data),
  },
};

export default services;
