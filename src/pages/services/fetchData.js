import { toast } from "react-toastify"
import { request } from "."

export default async function fetchData(
    jobId = "",
    keys = [],
    setValue = () => {}
) {
    const response = await request({ jobId: jobId }).catch((err) => {
        console.log(err)
        toast("خطای دریافت اطلاعات")
    })

    const data = response.data
    keys.forEach((key) => setValue(key, data[key]))
    return
}
