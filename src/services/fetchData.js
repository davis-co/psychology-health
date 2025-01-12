import { request } from "./";

export default async function fetchData(
  jobId = "",
  keys = [],
  setValue = () => {}
) {
  const response = await request({ jobId: jobId });
  const data = response.data;
  keys.forEach((key) => setValue(String(key), data[String(key)]));
  return;
}
