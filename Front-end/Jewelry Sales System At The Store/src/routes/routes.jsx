import { createBrowserRouter } from "react-router-dom";
import Loadable from "./Loadable";
import MainLayout from "../layout/MainLayout";
import AuthGuard from "./AuthGuard";

const Login = Loadable({ loader: () => import("../pages/login/Login") });
const Home = Loadable({ loader: () => import("../pages/home/Home") });
const Dashboard = Loadable({
  loader: () => import("../pages/dashboard/Dashboard"),
});
export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthGuard />,

    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: Dashboard,
          },
          {
            path: "home",
            element: Home,
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: Login,
  },
  {
    path: "*",
    element: <div>ERROR</div>,
  },
]);
