import { lazy } from "react"
import NotFound from "@/pages/404"
import Unathorized from "@/pages/401"
import { Outlet } from "react-router-dom"
import { Page } from "@/components/elements"


const Home = lazy(() => import("@/pages/Home/index"))
const MentalHealth = lazy(() =>
    import("@/pages/MentalHealth/index")
)
const NEO = lazy(() =>
    import("@/pages/NEO/index")
)
const SCL90 = lazy(() =>
    import("@/pages/SCL90/index")
)


// const ErrorPage = lazy(() => import("components/error/ErrorPage"));

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
                path: "mental-health",
                element: (
                    <Page name="سلامت روان">
                        <MentalHealth/>
                    </Page>
                ),
            },
            {
                path: "neo",
                element: (
                    <Page name="NEO">
                       <NEO />
                    </Page>
                ),
            },
            {
                path: "scl90",
                element: (
                    <Page name="SCL90">
                       <SCL90 />
                    </Page>
                ),
            },
            {
                path: "/Unathorized",
                element: (
                    <Page name="سلامت روان">
                        <Unathorized />
                    </Page>
                ),
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]
