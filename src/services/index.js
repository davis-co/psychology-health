import axios from 'axios';

import {
  baseURL,
  GWT,
} from '@/config/config';
import { bToA } from '@/utils/helpers';

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


export const requestFunction = async ({
  jobId,
  dataInfo,
  page = 1,
  pageSize = 10,
}) => {
  const formData = new FormData()
  const newDataInfo = {}

  for (const key in dataInfo) {
      if (key.startsWith("file_")) {
          formData.append(key, dataInfo[key][0])
      } else {
          newDataInfo[key] = dataInfo[key]
      }
  }

  const token = localStorage.getItem("token")
  const detail = {}

  for (const key in newDataInfo) {
      detail[key] = newDataInfo[key]
  }

  for (const key in dataInfo) {
      if (key.startsWith("file_")) {
          detail[key] = dataInfo[key][0].name
      }
  }

  const detailBase64 = detail ? bToA(detail) : bToA({})

  formData.append("detail", detailBase64)
  formData.append("jobId", `${jobId}`)
  formData.append("token", `${token}`)
  formData.append("gwt", GWT)
  formData.append("offset", ((page - 1) * pageSize).toString())
  formData.append("limit", pageSize.toString())

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
