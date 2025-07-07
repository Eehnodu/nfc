import { createBrowserRouter } from "react-router-dom";
import MainDashboard from "@/pages/MainDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainDashboard />,
  },
]);
