import { DateInput, Select, TextField } from "@/components/elements"
import React from "react"
import { i18n } from "./i18n"
import styles from "./styles.module.css"
import { illnesses, typeOfCancer } from "../data"
import { Controller } from "react-hook-form"
import { useSelector } from "react-redux"
import { setSelectErrors } from "@/states/reducers/serverData"
import UserGuide from "../HistoryOfDiseases/UserGuide"

export default function SDI({ watch, register, setValue, errors, control }) {
    const showOtherCancers = watch("12323")?.includes(1514695538183)
    const showOthers = watch("12323")?.includes(13427)
    const selectErrors = useSelector((state) => state.serverData.selectErrors)

    return (
        <div className={styles.container}>
            <Select
                userGuide={<UserGuide text={i18n.isSelfDecIllnessGuide} />}
                label={i18n.isSelfDeclaredIllness}
                multi={true}
                isError={selectErrors?.includes("12323")}
                selectedOptions={watch("12323") || null}
                required={true}
                options={illnesses}
                modalLabel={"بیماری ها"}
                className={styles.cancersSelectionBox}
                placeholder={i18n.typeAtLeastTwoCharacters}
                setValue={(val) => {
                    setValue("12323", val)
                    setSelectErrors(
                        selectErrors.filter((key) => key === "12323")
                    )
                }}
            />
            {showOthers || showOtherCancers ? (
                <div className={styles.subContainer}>
                    {showOthers ? (
                        <TextField
                            placeholder={
                                i18n.enterTheOtherDiseasesThatYouReport
                            }
                            label={i18n.writeTheNamesOfOtherIllnesses}
                            isError={!!errors[15923]}
                            {...register("15923")}
                            value={watch("15923")}
                        />
                    ) : null}
                    {showOtherCancers ? (
                        <>
                            <Select
                                label={i18n.otherCancers}
                                multi={true}
                                required={true}
                                isError={selectErrors?.includes("10517")}
                                selectedOptions={watch("10517") || null}
                                options={typeOfCancer}
                                modalLabel={"سرطان ها"}
                                showTextField={false}
                                setValue={(val) => {
                                    setValue("10517", val)
                                    setSelectErrors(
                                        selectErrors.filter(
                                            (key) => key === "10517"
                                        )
                                    )
                                }}
                            />
                            <DateInput
                                control={control}
                                isError={!!errors[10518]}
                                id="10518"
                                label={i18n.dateOfHealedCancer}
                                required={true}
                                {...register("10518")}
                                containerClassName={styles.dateInputClassName}
                                fieldClassName={styles.dateInput}
                            />
                        </>
                    ) : null}
                </div>
            ) : null}
        </div>
    )
}
