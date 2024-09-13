import { selectInputKeys } from "@/constants/form"
import { setSelectErrors } from "@/states/reducers/serverData"
import { toast } from "react-toastify"

// export const selectValidation = (watch, dispatch) => {
//     const errors = []
//     selectInputKeys.forEach((sKey) => {
//         if (sKey?.related) {
//             Object.keys(sKey.related).forEach((rValue) => {
//                 if (watch(sKey.key).includes(Number(rValue))) {
//                     sKey.related[rValue].forEach((rKey) => {
//                         if (
//                             watch(rKey.key)?.length === 0 ||
//                             typeof watch(rKey.key) == "string" ||
//                             !watch(rKey.key)
//                         ) {
//                             errors.push(rKey.key)
//                         }
//                     })
//                 } else {
//                     if (
//                         watch(sKey.key)?.length === 0 ||
//                         typeof watch(sKey.key) == "string" ||
//                         !watch(sKey.key)
//                     ) {
//                         errors.push(sKey.key)
//                     }
//                 }
//             })
//         } else {
//             if (
//                 watch(sKey.key)?.length === 0 ||
//                 typeof watch(sKey.key) == "string" ||
//                 !watch(sKey.key)
//             ) {
//                 errors.push(sKey.key)
//             }
//         }
//     })
//     if (errors.length > 0) {
//         toast.error("لطفا تمامی فرم را با دقت پر کنید.")
//         window.scrollTo({ top: 100, left: 0, behavior: "smooth" })
//     }
//     dispatch(setSelectErrors(errors))
//     return errors?.length > 0 ? false : true
// }
