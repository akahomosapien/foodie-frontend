import { createBrowserRouter } from "react-router-dom";
import SignUp from "../features/auth/pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/signup",
    element: (
      <>
        <SignUp />
      </>
    ),
  },
]);

export default router;
