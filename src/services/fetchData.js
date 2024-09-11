import { smartRequest } from "."

export default async function fetchData(
  jobId = "",
  keys = [],
  setValue = () => {}
) {
  const response = await smartRequest(jobId)
  const data = response.data
  Object.keys(keys).forEach((key) => setValue(key, data[key]))
  return 
}
