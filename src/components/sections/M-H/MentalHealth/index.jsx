import React, { useState } from "react"
import styles from "./styles.module.css"
import classNames from "classnames"
import { mentalHealthDisOrder, text, yesNoQuestion } from "./text"

import {
  CheckBox,
  Divider,
  Label,
  Radio,
  TextField,
} from "@/components/elements"
import K6Test from "./k6"
import DomesticViolence from "./domesticViolence"
import { useMentalAssessmentStore } from "./k6/store"
import { useViolenceAssessmentStore } from "./domesticViolence/store"

export default function MentalHealth({ errors, watch, register, setValue }) {
  const { mentalAssessmentTotal } = useMentalAssessmentStore()
  const { violenceAssessmentTotal } = useViolenceAssessmentStore()
  return (
    <main className={styles.container} id="formContainer">
      <section>
        <h5 className={styles.title}>{text.title}</h5>
        <p className={styles.description}>{text.description}</p>
      </section>
      <div className={styles.questionPart}>
        <section className="flex items-center py-3 px-2 rounded flex-wrap flex-row justify-between  lg:w-full bg-zinc-50 gap-2 shadow-md">
          <div className=" flex-auto">
            <Label
              containerClassName={styles.question}
              title={text.mentalDisorder}
              required={true}
              isError={!!errors[10437]}
            />
          </div>
          {/* <Divider className="block w-1/2 mx-auto my-3 md:hidden lg:hidden" /> */}
          {mentalHealthDisOrder?.map((o) => (
            <div className={classNames(styles.radios, "flex-auto")}>
              <CheckBox
                value={o.value}
                label={o.label}
                key={o.label}
                checked={watch("10437")?.includes(o.value)}
                onChange={(e) => {
                  const values = watch("10437") || []
                  if (e.target.checked) {
                    setValue("10437", [...values, o.value])
                  } else {
                    setValue(
                      "10437",
                      values.filter((val) => val !== o.value)
                    )
                  }
                }}
              />
            </div>
          ))}
        </section>
        {watch("10437")?.includes("10652") ? (
          <section className="flex xs:flex-wrap gap-2 bg-zinc-50 p-2  items-center rounded w-full shadow-md">
            <div className="flex-auto">
              <TextField
                containerClassName="flex-row items-center"
                label={text.typeOfMentalDisease + ":"}
                placeholder={text.typeOfMentalDisease}
                isError={!!errors[10438]}
                {...register("10438", { required: true })}
                value={watch("10438")}
                required
              />
            </div>
          </section>
        ) : null}

        {watch("10437")?.includes("1514109071882") ||
        watch("10437")?.includes("1514109106067") ? (
          <section className={styles.booleanFormItem}>
            <Label
              containerClassName={styles.question}
              title={text.historyOfSuicideAttempts}
              required={true}
              isError={!!errors[10441]}
            />

            <div className={classNames(styles.radios)}>
              {yesNoQuestion?.map((o) => (
                <Radio
                  checked={o.value === watch("10441")}
                  value={o.value}
                  label={o.label}
                  key={o.value}
                  {...register("10441", {
                    required: true,
                  })}
                />
              ))}
            </div>
          </section>
        ) : null}
      </div>
      <div className={styles.questionPart}>
        <section className={styles.booleanFormItem}>
          <Label
            containerClassName={styles.question}
            title={text.currentlyHavingSuicidalThoughts}
            required={true}
            userGuide=<div className="p-5">{text.alertSuicidalThoughts}</div>
            isError={!!errors[11892]}
          />
          <div className={classNames(styles.radios)}>
            {yesNoQuestion?.map((o) => (
              <Radio
                checked={o.value === watch("11892")}
                value={o.value}
                label={o.label}
                key={o.value}
                {...register("11892", {
                  required: true,
                })}
              />
            ))}
          </div>
        </section>
        {watch("11892") === "10361" ? (
          <section className={styles.booleanFormItem}>
            <Label
              containerClassName={styles.question}
              title={text.willingnessToTalkWithHealthConsultant}
              isError={!!errors[12504]}
            />
            <div className={classNames(styles.radios)}>
              {yesNoQuestion?.map((o) => (
                <Radio
                  checked={o.value === watch("12504")}
                  value={o.value}
                  label={o.label}
                  key={o.label}
                  {...register("12504")}
                />
              ))}
            </div>
          </section>
        ) : null}
      </div>
      {watch("11892") === "10361" &&
      (watch("10437")?.includes("1514108884563") ||
        watch("10437")?.includes("1514109185115") ||
        watch("10437")?.includes("1513768760443") ||
        watch("10437")?.includes("1514190240786")||
        watch("10437")?.includes("10652")||
        watch("10437")?.includes("10653")) ? (
          <section className={styles.booleanFormItem}>
            <Label
              containerClassName={styles.question}
              title={text.historyOfSuicideAttempts}
              required={true}
              isError={!!errors[10441]}
            />

            <div className={classNames(styles.radios)}>
              {yesNoQuestion?.map((o) => (
                <Radio
                  checked={o.value === watch("10441")}
                  value={o.value}
                  label={o.label}
                  key={o.value}
                  {...register("10441", {
                    required: true,
                  })}
                />
              ))}
            </div>
          </section>
      ) : null}

      <K6Test
        errors={errors}
        watch={watch}
        register={register}
        setValue={setValue}
      />
      {watch("11892") === "10361" ? (
        <div className={styles.message}>
          <p>{text.result5MentalHealth}</p>
        </div>
      ) : null}

      {watch("11892") === "10362" &&
      (watch("10441") === "10361" || watch("10440") === "10361") ? (
        <div className={styles.message}>
          <p>{text.result4MentalHealt}</p>
        </div>
      ) : null}

      {watch("11892") === "10362" && watch("10441") === "10362" ? (
        <div className={styles.message}>
          <p>{text.result3MentalHealt}</p>
        </div>
      ) : null}

      {(watch("10437")?.includes("10652") ||
        watch("10437")?.includes("10653") ||
        watch("10437")?.includes("1513768760443")) &&
      mentalAssessmentTotal <= 10 ? (
        <div className={styles.message}>
          <p>{text.result2MentalHealt}</p>
        </div>
      ) : null}

      {((watch("10437")?.includes("1514109071882") ||
        watch("10437")?.includes("1514109106067")) &&
        mentalAssessmentTotal < 10) ||
      mentalAssessmentTotal == 5 ? (
        <div className={styles.message}>
          <p>{text.result1MentalHealt}</p>
        </div>
      ) : null}
      <DomesticViolence
        errors={errors}
        watch={watch}
        register={register}
        setValue={setValue}
      />


      {/* {violenceAssessmentTotal > 10 ? (
        <div className={styles.message}>
          <p>{text.result8MentalHealt}</p>
        </div>
      ) : null} */}
    </main>
  )
}
