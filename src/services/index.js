import axios from "axios"
import { baseURL, GWT } from "@/config/config"
import { bToA } from "@/utils/helpers"

export const smartRequest = async (jobId, dataInfo) => {
  const token = localStorage.getItem("token")
  const detail = dataInfo ? bToA(dataInfo) : bToA({})
  const formData = new FormData()
  formData.append("detail", detail)
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
