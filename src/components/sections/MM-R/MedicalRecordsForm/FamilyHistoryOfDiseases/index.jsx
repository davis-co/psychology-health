import { Select, TextField } from "@/components/elements"
import React from "react"
import { i18n } from "./i18n"
import styles from "./styles.module.css"
import { illnesses, typeOfCancer } from "../data"
import { setSelectErrors } from "@/states/reducers/serverData"
import { useSelector } from "react-redux"

export default function FHOD({ watch, register, setValue, errors }) {
    const showOtherCancers = watch("12327")?.includes(1514695538183)
    const showOthers = watch("12327")?.includes(13427)
    const selectErrors = useSelector((state) => state.serverData.selectErrors)

    return (
        <div className={styles.container}>
            <Select
                label={i18n.familyRecord}
                multi={true}
                required={true}
                isError={selectErrors?.includes("12327")}
                selectedOptions={watch("12327") || null}
                options={illnesses}
                modalLabel={"بیماری ها"}
                className={styles.cancersSelectionBox}
                setValue={(val) => {
                    setValue("12327", val)
                    setSelectErrors(selectErrors.filter((key) => key === '12327' ))
                }}
                placeholder={i18n.typeAtLeastTwoCharacters}
            />
            {showOthers ? (
                <div className={styles.subContainer}>
                    <TextField
                        placeholder={i18n.enterTheOtherDiseasesThatYouReport}
                        label={i18n.writeTheNamesOfOtherIllnesses}
                        isError={!!errors[15170]}
                        {...register("15170")}
                        value={watch("15170")}
                    />
                    {/* <Select
                    label={i18n.otherCancers}
                    multi={true}
                    required={true}
                    selectedOptions={["سایر", "سرطان ها"]}
                    options={typeOfCancer}
                    modalLabel={"سرطان ها"}
                    showTextField={false}
                /> */}
                </div>
            ) : null}
        </div>
    )
}
