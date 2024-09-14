import { FORM_SIZE } from "@/constants/form"

export const validateForm = (keys, watch) => {
    if (Object.keys(keys).every((key) => watch(key))) {
        return true
    }
    return false
}

export const lastPage = (keys, watch, qLength = 243, size = FORM_SIZE) => {
    const valideLength =
        qLength % size > 0
            ? qLength - (qLength % size) + size
            : qLength
    if (Math.floor(keys.findLastIndex((key) => watch(key)) / size) == 0) {
        return 0
    } else if (
        valideLength -
        Math.floor(keys.findLastIndex((key) => watch(key)) / size) * size
    ) {
        return valideLength - size
    } else {
        return Math.floor(keys.findLastIndex((key) => watch(key)) / size) * FORM_SIZE
    }
}
