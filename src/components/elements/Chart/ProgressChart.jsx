import classNames from "classnames"

// dar package npm ProgressChart to replace kon ba in
// va props hash ro az git check kon.
// sepas

const ProgressChart = ({ className, generalData, userData }) => {
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
        <div
            className={classNames(
                className,
                "bg-gray-e7 w-full flex justify-end h-5 lg:h-8 rounded overflow-hidden"
            )}
        >
            <div
                className={`flex h-full origin-left items-center justify-center overflow-hidden rounded-r transition-all duration-500`}
                style={{
                    width: targetWidth || 0,
                    background: `linear-gradient(90deg, ${
                        targetColor + "aa"
                    } 0%, ${targetColor} 100%)`,
                }}
            >
                <span className="w-fit rounded bg-black bg-opacity-30 px-1 pt-[1px] text-2xs text-white lg:text-xs">
                    {userData}
                </span>
            </div>
        </div>
    )
}

export default ProgressChart
