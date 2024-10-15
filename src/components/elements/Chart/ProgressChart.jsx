const ProgressChart = ({ generalData, userData }) => {
    console.log(userData)
    let Max, target, targetColor, targetWidth
    if (userData) {
        Max = generalData[generalData.length - 1].value.max
        // Min = generalData[0].value.min
        target =
            generalData.find((item) => item.value.max > userData) ||
            generalData[generalData.length - 1]
        targetColor = target.color
        targetWidth = (userData / Max) * 100 + "%"
    }
    return (
        <div className="bg-gray-300 w-full flex justify-end h-5 lg:h-8 rounded overflow-hidden">
            <div
                className={`h-full rounded-r transition-all origin-left duration-500`}
                style={{
                    width: targetWidth || 0,
                    background: `linear-gradient(90deg, ${
                        targetColor + "aa"
                    } 0%, ${targetColor} 100%)`,
                }}
            ></div>
        </div>
    )
}

export default ProgressChart
