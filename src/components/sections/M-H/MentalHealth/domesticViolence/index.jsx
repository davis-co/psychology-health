import React, { useState } from "react"
import styles from "./styles.module.css"
import classNames from "classnames"
import { text } from "./text"
import alertIcon from "@/assets/icons/alert-solid.svg"
import { Button, Divider, Label, Modal, Radio } from "@/components/elements"
import { radioFiveMentalHealth } from "./text"
import { questionsDomesticViolence } from "./data"
import CalculateAssessment from "../CalculateAssessment"
import { yesNoQuestion } from "../text"
import { useViolenceAssessmentStore } from "./store"
import PDF from "@/assets/icons/PDF.svg"
import pdfDoc from "@/assets/multimedia/documents/violenceDoc.pdf"
import { createPortal } from "react-dom"
export default function DomesticViolence({
  errors,
  watch,
  register,
  setValue,
}) {
  const { violenceAssessmentTotal, setViolenceAssessmentTotal } =
    useViolenceAssessmentStore()
  const [point, setPoint] = useState(0)
  const [pdfContent, setPdfContent] = useState(false)
  const scoreMap = {
    10428: 4,
    10429: 3,
    10430: 2,
    10432: 1,
    10431: 0,
  }

  const watchedValues = watch(["10443", "10444", "10445", "10446"])

  const calcTotalScore = () => {
    const totalScore = questionsDomesticViolence.reduce(
      (total, question, index) => {
        const value = watchedValues[index]
        return total + (scoreMap[value] || 0)
      },
      0
    )

    setPoint(totalScore)
    setValue("10552", totalScore)
    setViolenceAssessmentTotal(totalScore)
  }

  const generalData = [
    { name: "level1", value: { min: 0, max: 5 }, color: "#86efac" },
    { name: "level2", value: { min: 5.1, max: 10 }, color: "#16a34a" },
    { name: "level3", value: { min: 10.1, max: 15 }, color: "#FFFF00" },
    { name: "level4", value: { min: 15.1, max: 20 }, color: "#FF0000" },
  ]
  const userData = {
    name: "userMentalPoint",
    value: point,
  }
  return (
    <>
      <fieldset className={styles.listOfQuestions}>
        <legend className="mr-4 text-[#3D0C02]">
          {text.domesticViolenceTest}
        </legend>
        <p className={styles.description}>{text.domesticViolenceDescription}</p>
        {questionsDomesticViolence.map((q) => (
          <section className="flex items-center py-3 px-2  rounded flex-wrap  flex-row w-full md:justify-between    bg-zinc-50 shadow-md">
            <Label
              containerClassName=" md:w-1/2 xs:w-1/3 "
              title={q.label}
              required={true}
              // isError={!!errors[q.key]}
            />

            {radioFiveMentalHealth?.map((o) => (
              <Radio
                customStyle=" xs:justify-between my-1 mx-1 flex-auto item-center"
                checked={o.value === watch(q.key)}
                value={o.value}
                label={o.label}
                key={o.label + q.label}
                {...register(q.key, {
                  required: true,
                })}
              />
            ))}
          </section>
        ))}
      </fieldset>
      <section className="flex py-[2px] px-[2px] flex-wrap w-full flex-col gap-6 bg-zinc-200">
        <div className="flex justify-between md:gap-16 xs:gap-4 md:flex-row xs:flex-col">
          <div className="bg-zinc-50 shadow-md md:w-1/2 xs:h-full flex items-center p-2 justify-between rounded">
            <Label
              containerClassName=""
              title={text.domesticAssesment}
              required={true}
              // isError={!!errors[q.key]}
            />
            <div className="flex items-center justify-center gap-2  ">
              <Button
                type="button"
                style="text"
                icon={<img src={alertIcon} width={16} height={16} />}
              />
              <Button
                className="w-12"
                style="outlined"
                type="button"
                onClick={calcTotalScore}
                title="محاسبه"
              />

              <div className="w-[242px] h-7 margin-auto self-start bg-zinc-50 ">
                <CalculateAssessment
                  generalData={generalData}
                  userData={userData}
                  valuesLength={20}
                />
              </div>
            </div>
          </div>
          <div className={styles.booleanFormItem}>
            <Label
              containerClassName="w-full"
              title={text.willingnessReceiveSpecializedServices}
              required={true}
              isError={!!errors[10667]}
            />

            <div className={classNames(styles.radios)}>
              {yesNoQuestion?.map((o) => (
                <Radio
                  checked={o.value === watch("10667")}
                  value={o.value}
                  label={o.label}
                  key={o.value}
                  {...register("10667", {
                    required: true,
                  })}
                />
              ))}
            </div>
          </div>
        </div>
        <div>
          {violenceAssessmentTotal > 4 && violenceAssessmentTotal >= 10 ? (
            <div className={styles.message}>
              <p>{text.result6MentalHealt}</p>
            </div>
          ) : null}

          {violenceAssessmentTotal <= 4 ? (
            <div className={styles.message}>
              <p>{text.result7MentalHealt}</p>
            </div>
          ) : null}
        </div>
      </section>
      <section className="flex items-center py-3  rounded flex-wrap  flex-row w-full  justify-between  ">
        <div className="bg-zinc-50 shadow-md w-1/2 flex items-center p-2 justify-between rounded">
          <Label
            containerClassName="text-[11px]"
            title={text.violenceContent}
            isError={!!errors[10435]}
          />
          <div
            className=" flex justify-between  gap-6 border border-zinc-500 rounded p-1 cursor-pointer"
            onClick={() => setPdfContent(true)}
          >
            <span className="text-[11px]">محتوای متنی</span>
            <span>
              <img src={PDF} />
            </span>
          </div>
        </div>
      </section>
      {pdfContent
        ? createPortal(
            <Modal onClose={() => setPdfContent(false)}>
              {" "}
              <section className="h-[474px] bg-slate-700 text-white mt-4 mb-6 ">
                <object
                  data={pdfDoc}
                  type="application/pdf"
                  width="100%"
                  height="100%"
                ></object>
              </section>
            </Modal>,
            modal
          )
        : null}
    </>
  )
}
