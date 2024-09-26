import React, { useEffect, useState } from "react"
import styles from "./styles.module.css"
import classNames from "classnames"
import { score, text } from "./text"

import { Button, Divider, Label, Radio } from "@/components/elements"
import alertIcon from "@/assets/icons/alert-solid.svg"
import { radioFiveMentalHealth } from "./text"
import { questionsK6 } from "./data"
import CalculateAssessment from "../CalculateAssessment"
import StackedBarChart from "../CalculateAssessment"
import { useDispatch } from "react-redux"
import { setMentalAssesmentTotal } from "@/states/reducers/serverData"
import { useMentalAssessmentStore } from "./store"

export default function K6Test({ errors, watch, register, setValue }) {
  const { setMentalAssessmentTotal } = useMentalAssessmentStore()
  const [point, setPoint] = useState(0)
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

    setPoint(totalScore)
    setValue("10435", totalScore)
    setMentalAssessmentTotal(totalScore)
  }

  const generalData = [
    { name: "level1", value: { min: 0, max: 6 }, color: "#86efac" },
    { name: "level2", value: { min: 6.1, max: 12 }, color: "#16a34a" },
    { name: "level3", value: { min: 12.1, max: 18 }, color: "#FFFF00" },
    { name: "level4", value: { min: 18.1, max: 24 }, color: "#FF0000" },
  ]
  const userData = {
    name: "userMentalPoint",
    value: point,
  }
  return (
    <>
      <fieldset className={styles.listOfQuestions}>
        <legend className="mr-4 text-[#3D0C02]">{text.k6Test}</legend>
        <p className={styles.description}>{text.k6Description}</p>

        {questionsK6.map((q) => (
          <section className="flex items-center py-3 px-2  rounded flex-wrap  flex-row w-full md:justify-between    bg-zinc-50 shadow-md">
            <Label
              containerClassName=" md:w-1/2 xs:w-1/3 "
              title={q.label}
              required={true}
              isError={!!errors[q.key]}
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

        <section className="flex items-center rounded flex-wrap pt-[2px] flex-col gap-6 w-full bg-zinc-200  justify-between ">
          <div className="bg-zinc-50  shadow-md w-1/2 flex items-center p-2 justify-between rounded">
            <Label
              containerClassName=""
              title={text.mentalAssessment}
              required={true}
              isError={!!errors[10435]}
            />
            <div className="flex items-center justify-center gap-2  ">
              {point >= 10 ? (
                <Button
                  type="button"
                  style="text"
                  // onClick={() => setSmokeModalNo(!smokeModalNo)}
                  // icon={<InfoCircle size="18" color="#FF0000" variant="Bold" />}
                  icon={<img src={alertIcon} width={16} height={16} />}
                />
              ) : null}
              <Button
                className="w-12"
                style="outlined"
                type="button"
                onClick={calcTotalScore}
                title="محاسبه"
              />

              <div className="w-[242px] h-7 margin-auto self-start bg-zinc-50  ">
                <CalculateAssessment
                  generalData={generalData}
                  userData={userData}
                  valuesLength={24}
                />
              </div>
            </div>
          </div>
          {point >= 10 ? (
          <div className={classNames(styles.message)}>
            <p>{text.alertMentalAssessment}</p>
          </div>
        ) : null}
        </section>
       
      </fieldset>
    </>
  )
}
