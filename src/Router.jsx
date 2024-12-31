import { useEffect, useState } from "react"
import { BrowserRouter, useNavigate, useRoutes } from "react-router-dom"
import { static_routes } from "@/constants/routes"
import { smartRequest } from "@/services"
import { Page } from "./components/elements"
import Loading from "./pages/Loading"
import checkToken, { handlePostMessage } from "./services/checkToken"
import { ToastContainer } from "react-toastify"
// import useDetailsStore from "./details_states"

function AppRouter() {
  const routes = useRoutes(static_routes)
  const navigate = useNavigate()
  const [isAuthorized, setIsAuthorized] = useState("loading")
  // const fetchDetails = useDetailsStore((state) => state.fetchDetails)

  useEffect(() => {
    checkToken("production", (val) => setIsAuthorized(val))
    return () => {
      window.removeEventListener("message", (e) =>
        handlePostMessage(e, (val) => setIsAuthorized(val))
      )
      localStorage.clear()
    }
  }, [])

  useEffect(() => {
    if (isAuthorized === true) {
      if (window.location.href.includes("Unathorized")) {
        navigate("/")
      }
      // fetchDetails()
    }
    if (isAuthorized === false) navigate("/Unathorized")
  }, [isAuthorized])

  return isAuthorized === "loading" ? (
    <Page name="سلامت روان">
      <Loading />
    </Page>
  ) : (
    <>
      {routes}
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
    </>
  )
}

export default AppRouter
