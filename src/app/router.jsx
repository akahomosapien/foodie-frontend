import { createBrowserRouter } from "react-router-dom";
import SignUp from "../features/auth/pages/SignUp";
import SignIn from "@/features/auth/pages/SignIn";
import ForgotPassword from "@/features/auth/pages/ForgotPassword";

const router = createBrowserRouter([
  {
    path: "/signup",
    element: (
      <>
        <SignUp />
      </>
    ),
  },
  {
    path: "/signin",
    element: (
      <>
        <SignIn />
      </>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <>
        <ForgotPassword />
      </>
    ),
  },
]);

export default router;
