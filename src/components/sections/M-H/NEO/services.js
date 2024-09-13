export const validateForm = (keys, watch) => {
    if (Object.keys(keys).every((key) => watch(key))) {
        return true
    }
    return false
}

export const lastPage = (keys, watch, qLength = 243, size = 9) => {
    if (Math.floor(keys.findLastIndex((key) => watch(key)) / size) == 0) {
        return 0
    } else if (
        qLength -
        Math.floor(keys.findLastIndex((key) => watch(key)) / size) * size
    ) {
        return qLength - size
    } else {
        return Math.floor(keys.findLastIndex((key) => watch(key)) / size) * 9
    }
}
