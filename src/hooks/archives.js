import { smartRequest } from "@/services"
import { useEffect, useState } from "react"

export const useArchives = (jobId) => {
    const [archives, setArchives] = useState([])

    const fetchData = async () => {
        const response = await smartRequest(jobId)
        setArchives(response.data)
    }

    useEffect(() => {
        fetchData()
    }, [])
    return [archives]
}
