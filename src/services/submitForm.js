import { smartRequest } from "."

export default async function submitForm(
    submitJobId,
    data,
    callback = () => {}
) {
    await smartRequest(submitJobId, data)
    callback()
}