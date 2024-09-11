import { booleanOptions } from "@/constants/form"
import { usageType } from "../data"
import { toast } from "react-toastify"

export const addDrug = (watch, setValue, setErrorsList) => {
    if (["10520", "12750", "10522"].every((key) => watch(key))) {
        const drug = {
            10520: watch("10520") || "",
            12754: watch("12754") || "",
            10577: watch("10577") || "",
            10522: {
                v:
                    usageType.filter((obj) => obj.value === watch("10522"))[0]
                        ?.label || "",
                id: watch("10522") || "",
            },
            10575: watch("10575") || "",
            12750: {
                v:
                    booleanOptions.filter(
                        (obj) => obj.value === watch("12750")
                    )[0]?.label || "",
                id: watch("12750") || "",
            },
            otag: Date.now(),
        }
        setValue("10997", [...watch("10997"), drug])
        ;["10520", "12754", "10577", "10522", "10575", "12750"].forEach((key) =>
            setValue(key, "")
        )
        setErrorsList(null)
    } else {
        setErrorsList(
            ["10520", "12750", "10522"].filter((key) => watch(key) === "")
        )
        toast.error("فرم مربوط به دارو را کامل کنید.")
    }
}

export const extTableRows = (data) => {
    return data?.map((_, i) => [
        i + 1,
        _["10520"],
        _["12754"],
        typeof _["10577"] == "string" ? _["10577"] : _["10577"]?.v,
        _["10575"],
        typeof _["10522"] == "string" ? _["10522"] : _["10522"]?.v,
        typeof _["12750"] == "string" ? _["12750"] : _["12750"]?.v,
    ])
}

export const deleteDrug = (index, setValue, data) => {
    setValue(
        "10997",
        data.filter((_, i) => i !== index)
    )
}
