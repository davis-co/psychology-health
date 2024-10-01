import { create } from "zustand"
import { MFD_And_MFS_JobId_Get } from "./constants/jobId"
import { smartRequest } from "./services"
import { toast } from "react-toastify"

const detailsStore = (set, get) => ({
    details: {},
    fetchLoading: false,
    fetchDetails: async () => {
        set(() => ({
            fetchLoading: true,
        }))
        await smartRequest(MFD_And_MFS_JobId_Get)
            .then((res) => {
                if (!res.error) {
                    set(() => ({
                        details: res.data,
                    }))
                } else {
                    toast.error("خطای دریافت اطلاعات")
                }
            })
            .catch((err) => console.log(err))
            .finally(() =>
                set(() => ({
                    fetchLoading: false,
                }))
            )
    },
})

const useDetailsStore = create(detailsStore)

export default useDetailsStore
