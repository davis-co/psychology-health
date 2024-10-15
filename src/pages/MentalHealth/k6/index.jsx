import React, { useState } from "react"

import classNames from "classnames"

import { calcIconsvg } from "@/assets/icons"
import alertIcon from "@/assets/icons/alert-solid.svg"
import { Button, Label, ProgressChart } from "@/components/elements"
import RadioOptions from "@/components/elements/RadioOptions"

import CalculateAssessment from "../MultiProgress"
import { questionsK6 } from "./data"
import styles from "./styles.module.css"
import { radioFiveMentalHealth, text } from "./text"

export default function K6Test({
    errors,
    watch,
    register,
    setValue,
    pointK6,
    setPointK6,
}) {
    const [iconCalc, setIconCalc] = useState(false)
    const elements = []
    // console.log(point)

    const scoreMap = {
        10428: 4,
        10429: 3,
        10430: 2,
        10432: 1,
        10431: 0,
    }

    const watchedValues = watch([
        "10422",
        "10423",
        "10424",
        "10425",
        "10426",
        "10427",
    ])

    const calcTotalScore = () => {
        const totalScore = questionsK6.reduce((total, question, index) => {
            const value = watchedValues[index]
            return total + (scoreMap[value] || 0)
        }, 0)

        setPointK6(totalScore)
        setValue("10435", totalScore)
        setIconCalc(true)
    }

    const generalData = [
        { name: "level1", value: { min: 0, max: 6 }, color: "#86efac" },
        { name: "level2", value: { min: 6.1, max: 12 }, color: "#008000" },
        { name: "level3", value: { min: 12.1, max: 18 }, color: "#FFB200" },
        { name: "level4", value: { min: 18.1, max: 24 }, color: "#FF0000" },
    ]
    const userData = {
        name: "userMentalPoint",
        value: pointK6,
    }

    return (
        <>
            <fieldset className={styles.listOfQuestions}>
                <legend className="mr-4 px-2 text-[#3D0C02] lg:text-[18px] font-yekan700">
                    {text.k6Test}
                </legend>
                <p className={styles.description}>{text.k6Description}</p>

                {questionsK6.map((q) => (
                    <RadioOptions
                        key={q.key}
                        className="item-center mx-1 my-1 flex-auto font-yekan700 text-[10px] leading-4 text-black xs:justify-between"
                        label={q.label}
                        labelClassName={"lg:w-[350px]"}
                        questionKey={q.key}
                        required={true}
                        options={radioFiveMentalHealth}
                        register={register}
                        active={watch(q.key)}
                        isError={!!errors[q.key]}
                    />
                ))}

                <section className="flex w-full flex-col flex-wrap items-center justify-between gap-6 rounded bg-[#e4e4e4] p-[2px]">
                    <div className="flex items-center justify-start gap-5 rounded bg-white-light pr-2 shadow-md xs:w-full md:mb-6 md:w-1/2 md:pt-[2px]">
                        <Label
                            containerClassName=""
                            label={text.mentalAssessment}
                            required={true}
                            isError={!!errors[10435]}
                        />
                        <div className="flex flex-1 items-center justify-center gap-2 p-2">
                            {pointK6 >= 10 ? (
                                <Button
                                    type="button"
                                    style="text"
                                    icon={
                                        <img
                                            src={alertIcon}
                                            width={16}
                                            height={16}
                                        />
                                    }
                                />
                            ) : null}

                            <button
                                className={styles.calBtn}
                                type="button"
                                onClick={calcTotalScore}
                            >
                                {iconCalc ? (
                                    <img src={calcIconsvg} />
                                ) : (
                                    "محاسبه"
                                )}
                            </button>
                            <Label label={watch("10435") || ""} />
                            <div className="flex-1">
                                <ProgressChart
                                    generalData={generalData}
                                    userData={userData.value}
                                />
                            </div>
                        </div>
                    </div>

                    {watch("11892") === "10361" ? (
                        <div className={styles.message}>
                            <legend
                                className={
                                    styles.messageWarning + " " + "text-red"
                                }
                            >
                                {"هشدار"}
                            </legend>

                            <p>{text.result5MentalHealth}</p>
                        </div>
                    ) : null}

                    {watch("11892") === "10362" &&
                    (watch("10441") === "10361" ||
                        watch("10440") === "10361") ? (
                        <div className={styles.message}>
                            <p>{text.result4MentalHealt}</p>
                        </div>
                    ) : null}

                    {watch("11892") === "10362" &&
                    watch("10441") === "10362" ? (
                        <div className={styles.message}>
                            <p>{text.result3MentalHealt}</p>
                        </div>
                    ) : null}

                    {(watch("10437")?.includes("10652") ||
                        watch("10437")?.includes("10653") ||
                        watch("10437")?.includes("1513768760443")) &&
                    pointK6 <= 10 ? (
                        <div className={styles.message}>
                            <p>{text.result2MentalHealt}</p>
                        </div>
                    ) : null}

                    {((watch("10437")?.includes("1514109071882") ||
                        watch("10437")?.includes("1514109106067")) &&
                        pointK6 < 10) ||
                    pointK6 == 5 ? (
                        <div className={styles.message}>
                            <p>{text.result1MentalHealt}</p>
                        </div>
                    ) : null}
                    {pointK6 >= 10 ? (
                        <div className={classNames(styles.message)}>
                            <legend className={styles.messageWarning}>
                                {"هشدار"}
                            </legend>
                            <p>{text.alertMentalAssessment}</p>
                        </div>
                    ) : null}
                </section>
            </fieldset>
        </>
    )
}
