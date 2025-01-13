import { lazy } from "react";
import NotFound from "@/pages/404";
import Unathorized from "@/pages/401";
import { Outlet } from "react-router-dom";
import { Page } from "react-elements-davis";
import { i18n } from "./i18n";

const Home = lazy(() => import("@/pages/Home/index"));
const MentalHealth = lazy(() => import("@/pages/MentalHealth/index"));
const NEO = lazy(() => import("@/pages/NEO/index"));
const SCL90 = lazy(() => import("@/pages/SCL90/index"));
const Mcmi3 = lazy(() => import("@/pages/Mcmi3"));
const EQ = lazy(() => import("@/pages/EQ"));
const userData = localStorage.getItem("userData") || {};

export const static_routes =
  userData["1571128517445"] == "10361" || true
    ? [
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
              path: "mental-health",
              element: <MentalHealth />,
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
      ]
    : [
        {
          path: "/forbidden",
          element: (
            <>
              <p className="message text-red-600">{i18n.forbidden}</p>
            </>
          ),
          children: [],
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ];
