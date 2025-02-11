import { request } from "."

export default async function submitForm(
    submitJobId,
    data,
    callback = () => {}
) {
    await request({ jobId: submitJobId, dataInfo: data })
    callback()
}
