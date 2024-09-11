import "react-toastify/dist/ReactToastify.css"
import NotFound from "@/components/sections/404"
import { KEYS } from "@/constants/keys"
import { CreateForm } from "@/utils/createForm"
import Unauthorized from "@/components/sections/401"
import { useEffect, useState } from "react"
import Catalog from "./components/elements/Catalog"
import { Navbar } from "./components/elements"
import { ToastContainer } from "react-toastify"
import { AUTH_JobId } from "@/constants/jobId"
import { smartRequest } from "@/services"
import checkToken from "./services/checkToken"
import Loading from "./components/sections/Loading"

function App() {
    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect(() => {
        checkToken("development", (val) => setIsAuthorized(val))
        return () => {
            window.removeEventListener("message", (e) =>
                handlePostMessage(e, (val) => setIsAuthorized(val))
            )
            localStorage.clear()
        }
    }, [])

    if (isAuthorized === false) {
        return <Unauthorized />
    } else if (isAuthorized === true) {
        return (
            <div className={"body"}>
                <Navbar />
                <CreateForm
                    keys={KEYS}
                    hasSubmit={true}
                    projectName="سوابق پزشکی فردی و خانوادگی"
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
