import { createBrowserRouter } from "react-router-dom";
import SignUp from "../features/auth/pages/SignUp";
import SignIn from "@/features/auth/pages/SignIn";

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
]);

export default router;
