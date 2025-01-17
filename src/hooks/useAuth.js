import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import checkToken, { handlePostMessage } from "../services/checkToken"

export default function useAuth() {
    const [isAuthorized, setIsAuthorized] = useState("loading")
    const navigate = useNavigate()

    useEffect(() => {
        checkToken("development", (val) => setIsAuthorized(val))
        return () => {
            window.removeEventListener("message", (e) =>
                handlePostMessage(e, (val) => setIsAuthorized(val))
            )
            localStorage.clear()
        }
    }, [])

    useEffect(() => {
        if (isAuthorized) {
            if (window.location.href.includes("Unathorized")) {
                navigate("/")
            }
        }
        if (isAuthorized === false) navigate("/Unathorized")
    }, [isAuthorized])
    return [isAuthorized]
}
