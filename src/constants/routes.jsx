import { lazy } from "react";
import { Outlet } from "react-router-dom";

const Home = lazy(() => import("@/pages/Home"));
const NotFound = lazy(() => import("@/pages/404"));
const Unathorized = lazy(() => import("@/pages/401"));
const NEO = lazy(() => import("@/pages/NEO"));
const SCL90 = lazy(() => import("@/pages/SCL90"));
const Mcmi3 = lazy(() => import("@/pages/Mcmi3"));
const EQ = lazy(() => import("@/pages/EQ"));

export const static_routes = [
  {
    path: "/",
    errorElement: <NotFound />,
    element: (
      <>
        <Outlet />
      </>
    ),
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        path: "neo",
        element: <NEO />,
      },
      {
        path: "scl90",
        element: <SCL90 />,
      },
      {
        path: "mcmi3",
        element: <Mcmi3 />,
      },
      {
        path: "eq",
        element: <EQ />,
      },
      {
        path: "/Unathorized",
        element: <Unathorized />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
