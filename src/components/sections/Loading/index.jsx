import { Spinner } from "@/components/elements"
import React from "react"

export default function Loading() {
    return (
        <div className="flex flex-1 bg-white justify-center items-center">
            <Spinner size={120} color={"rgb(80, 220, 80)"} />
        </div>
    )
}
