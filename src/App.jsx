import "react-toastify/dist/ReactToastify.css"
import NotFound from "@/components/sections/404"
import { CreateForm } from "@/utils/createForm"
import Unauthorized from "@/components/sections/401"
import { useEffect, useState } from "react"
// import Catalog from "./components/elements/Catalog"
import { Navbar } from "./components/elements"
import { ToastContainer } from "react-toastify"
import { AUTH_JobId } from "@/constants/jobId"
import { smartRequest } from "@/services"
import checkToken from "./services/checkToken"
import Loading from "./components/sections/Loading"
import { pages } from "./constants/pages"

function App() {
    const [page, setPage] = useState(localStorage.getItem("prevPage") || "NEO")
    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect(() => {
        checkToken("development", (val) => setIsAuthorized(val))
        return () => {
            window.removeEventListener("message", (e) =>
                handlePostMessage(e, (val) => setIsAuthorized(val))
            )
            localStorage.clear()
            localStorage.setItem("prevPage", page)
        }
    }, [])

    if (isAuthorized === false) {
        return <Unauthorized />
    } else if (isAuthorized === true) {
        return (
            <div className={"body"}>
                <Navbar />
                <CreateForm
                    page={pages[page]}
                />
                <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={true}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
            </div>
        )
    } else {
        return <Loading />
    }
}
export default App
