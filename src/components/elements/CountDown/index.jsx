import React, { useEffect, useState } from "react"

const CountdownTimer = ({ initialTime = 7200 }) => {
    const [timeLeft, setTimeLeft] = useState(initialTime)

    useEffect(() => {
        if (timeLeft <= 0) return

        const timerId = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1)
        }, 1000)

        return () => clearInterval(timerId)
    }, [timeLeft])

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds % 3600) / 60)
        const secs = seconds % 60
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
            2,
            "0"
        )}:${String(secs).padStart(2, "0")}`
    }

    return (
        <div className="countdown">
            <div className="countdown-timer">{formatTime(timeLeft)}</div>
        </div>
    )
}

export default CountdownTimer
