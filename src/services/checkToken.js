import { AUTH_JobId } from "@/constants/jobId"
import { request } from "@/services"

export default function checkToken(type, callback) {
    if (type == "development") {
        console.log("develop", callback)
        localStorage.setItem("token", TEST_TOKEN)
        callback(true)
    } else {
        if (!document.referrer) callback(false)
        else {
            console.log("prev listener", callback)
            window.parent.postMessage({ tip: "getToken" }, document.referrer)
            window.addEventListener(
                "message",
                (e) => handlePostMessage(e, callback),
                false
            )
        }
    }
}

export const handlePostMessage = async (e, callback) => {
    localStorage.clear()
    const data = e.data
    if (data.tip === "getToken") {
        const oToken = data.token
        if (oToken) {
            localStorage.setItem("oToken", oToken)
            const data = { token: oToken }
            const response = await request({
                jobId: AUTH_JobId,
                dataInfo: data,
            })
            localStorage.setItem("token", data.token)
            if (response.error === false) {
                localStorage.setItem("userData", JSON.stringify(response.data))
                callback(true)
                console.log("set true")
            } else {
                callback(response.error)
                console.log("set false")
            }
        }
    }
}
