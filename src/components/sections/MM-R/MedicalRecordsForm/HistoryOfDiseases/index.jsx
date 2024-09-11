import { DateInput, Select, TextField } from "@/components/elements"
import React from "react"
import { i18n } from "./i18n"
import styles from "./styles.module.css"
import { illnesses, typeOfCancer } from "../data"
import { useSelector } from "react-redux"
import { setSelectErrors } from "@/states/reducers/serverData"
import UserGuide from "./UserGuide"

export default function HOD({ watch, register, setValue, errors, control }) {
    const showOtherCancers = watch("12324")?.includes(1514695538183)
    const showOthers = watch("12324")?.includes(13427)
    const selectErrors = useSelector((state) => state.serverData.selectErrors)

    return (
        <div className={styles.container}>
            <Select
                label={i18n.historyOfDiseases}
                userGuide={<UserGuide text={i18n.historyOfIllnessGuide} />}
                multi={true}
                required={true}
                isError={selectErrors?.includes("12324")}
                selectedOptions={watch("12324") || null}
                options={illnesses}
                modalLabel={"بیماری ها"}
                className={styles.cancersSelectionBox}
                setValue={(val) => {
                    setValue("12324", val)
                    setSelectErrors(
                        selectErrors.filter((key) => key === "12324")
                    )
                }}
                placeholder={i18n.typeAtLeastTwoCharacters}
            />
            {showOtherCancers || showOthers ? (
                <div className={styles.subContainer}>
                    {showOthers ? (
                        <TextField
                            placeholder={
                                i18n.enterTheOtherDiseasesThatYouReport
                            }
                            label={i18n.writeTheNamesOfOtherIllnesses}
                            isError={!!errors[15931]}
                            {...register("15931")}
                            value={watch("15931")}
                        />
                    ) : null}
                    {showOtherCancers ? (
                        <>
                            <Select
                                label={i18n.otherCancers}
                                multi={true}
                                required={true}
                                isError={selectErrors?.includes("12505")}
                                selectedOptions={watch("12505") || null}
                                options={typeOfCancer}
                                modalLabel={"سرطان ها"}
                                showTextField={false}
                                setValue={(val) => {
                                    setValue("12505", val)
                                    setSelectErrors(
                                        selectErrors.filter(
                                            (key) => key === "12505"
                                        )
                                    )
                                }}
                            />
                            <DateInput
                                control={control}
                                isError={!!errors[12506]}
                                id="12506"
                                label={i18n.dateOfHealedCancer}
                                required={true}
                                {...register("12506")}
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
