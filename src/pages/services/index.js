/* eslint-disable no-undef */
import axios from "axios"
import { baseURL } from "@/config/config"
import { bToA } from "@/utils/helpers"

export const request = async ({ jobId, dataInfo = {} }) => {
    const formData = new FormData()
    for (var key in dataInfo) {
        if (key.startsWith("file_")) {
            //   const original_file_key = key.replace("file_", "");
            formData.append(key, dataInfo[key])
            delete dataInfo[key]
        }
    }
    const token = localStorage.getItem("token")
    const detailBase64 = dataInfo ? bToA(dataInfo) : bToA({})

    formData.append("detail", detailBase64)
    formData.append("jobId", `${jobId}`)
    formData.append("token", `${token}`)
    formData.append("gwt", GWT)

    const response = await axios({
        method: "POST",
        url: baseURL,
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    return response.data
}
