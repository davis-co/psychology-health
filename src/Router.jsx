import { useRoutes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { static_routes } from "@/constants/routes"
import Loading from "./pages/Loading"
import useAuth from "./hooks/useAuth"
import "react-toastify/dist/ReactToastify.css"

export const AppRouter = () => {
    const routes = useRoutes(static_routes)
    const [isAuthorized] = useAuth()
    return isAuthorized === "loading" ? (
        <Loading />
    ) : (
        <>
            {routes}
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={true}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}

export default AppRouter
