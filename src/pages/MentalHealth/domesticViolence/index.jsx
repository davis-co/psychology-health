import React, { useState } from "react"

import { calcIconsvg } from "@/assets/icons"
import alertIcon from "@/assets/icons/alert-solid.svg"
import PDF from "@/assets/icons/PDF.svg"
import pdfDoc from "@/assets/multimedia/documents/violenceDoc.pdf"
import {
    Button,
    Label,
    Modal,
    ProgressChart,
    RadioOptions,
} from "@/components/elements"

import { yesNoQuestion } from "../i18n"
import CalculateAssessment from "../MultiProgress"
import { questionsDomesticViolence } from "./data"
import styles from "./styles.module.css"
import { radioFiveMentalHealth, text } from "./text"

export default function DomesticViolence({
    errors,
    watch,
    register,
    setValue,
    setPointDomestic,
    pointDomestic,
}) {
    const watchedValues = watch(["10443", "10444", "10445", "10446"])

    const [iconCalc, setIconCalc] = useState(false)
    const [pdfContent, setPdfContent] = useState(false)

    const scoreMap = {
        10428: 4,
        10429: 3,
        10430: 2,
        10432: 1,
        10431: 0,
    }

    const calcTotalScore = () => {
        const totalScore = questionsDomesticViolence.reduce(
            (total, question, index) => {
                const value = watchedValues[index]
                return total + (scoreMap[value] || 0)
            },
            0
        )

        setPointDomestic(totalScore)
        setValue("10552", totalScore)
        setIconCalc(true)
    }

    const generalData = [
        { name: "level1", value: { min: 0, max: 5 }, color: "#86efac" },
        { name: "level2", value: { min: 5.1, max: 10 }, color: "#16a34a" },
        { name: "level3", value: { min: 10.1, max: 15 }, color: "#FFFF00" },
        { name: "level4", value: { min: 15.1, max: 20 }, color: "#FF0000" },
    ]
    const userData = {
        name: "userMentalPoint",
        value: pointDomestic,
    }
    return (
        <>
            <fieldset className={styles.listOfQuestions}>
                <legend className="mr-4 px-2 text-[#3D0C02] lg:text-[18px] font-yekan700">
                    {text.domesticViolenceTest}
                </legend>
                <p className={styles.description}>
                    {text.domesticViolenceDescription}
                </p>
                {questionsDomesticViolence.map((q) => (
                    <div className="col-span-full" key={q.key}>
                        <RadioOptions
                            label={q.label}
                            questionKey={q.key}
                            required={true}
                            options={radioFiveMentalHealth}
                            register={register}
                            active={watch(q.key)}
                            isError={!!errors[q.key]}
                            labelClassName={"lg:w-[220px]"}
                        />
                    </div>
                ))}
            </fieldset>
            <section className={styles.gridcontainer}>
                <div className="flex items-center justify-between rounded bg-zinc-50 p-2 shadow-md xs:w-full">
                    <Label
                        className="lg:w-[40%]"
                        label={text.domesticAssesment}
                        required={true}
                    />
                    <div className="flex flex-1 items-center justify-center gap-2">
                        {pointDomestic > 10 ? (
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
                            {iconCalc ? <img src={calcIconsvg} /> : "محاسبه"}
                        </button>
                        <Label label={userData.value} />
                        <div className="flex-1">
                            <ProgressChart
                                generalData={generalData}
                                userData={userData.value}
                                // valuesLength={20}
                            />
                        </div>
                    </div>
                </div>
                <RadioOptions
                    label={text.willingnessReceiveSpecializedServices}
                    options={yesNoQuestion}
                    questionKey={"10667"}
                    active={watch("10667")}
                    labelClassName={"lg:w-[250px]"}
                    register={register}
                />
                <div className="col-span-full">
                    {pointDomestic > 4 && pointDomestic <= 10 ? (
                        <div className={styles.message}>
                            <p>{text.result6MentalHealt}</p>
                        </div>
                    ) : null}

                    {pointDomestic <= 4 ? (
                        <div className={styles.message}>
                            <p>{text.result7MentalHealt}</p>
                        </div>
                    ) : null}
                </div>
            </section>
            <section className="flex items-center justify-center">
                <div className="m-auto flex w-full items-center justify-between rounded bg-zinc-50 p-2 shadow-md md:w-2/5">
                    <Label
                        containerClassName="text-[11px]"
                        label={text.violenceContent}
                        isError={!!errors[10435]}
                        labelClassName={"lg:w-[200px]"}
                    />
                    <div className="flex cursor-pointer items-center justify-between gap-6 rounded border border-zinc-500 p-1">
                        <span
                            className="text-xs md:text-md"
                            onClick={() => setPdfContent(true)}
                        >
                            محتوای متنی
                        </span>
                        <span>
                            <img src={PDF} />
                        </span>
                    </div>
                </div>
            </section>
            {pdfContent ? (
                <Modal onClose={() => setPdfContent(false)}>
                    <section className="mb-6 mt-4 h-[474px] bg-slate-700 text-white">
                        <object
                            data={pdfDoc}
                            type="application/pdf"
                            width="100%"
                            height="100%"
                        ></object>
                    </section>
                </Modal>
            ) : null}
        </>
    )
}
