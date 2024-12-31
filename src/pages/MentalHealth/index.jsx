import React, { useEffect, useState } from "react"

import classNames from "classnames"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

import { Button, Modal, TextField } from "@/components/elements"
import CheckBoxGroup from "@/components/elements/CheckBoxGroup"
import RadioOptions from "@/components/elements/RadioOptions"
import { mentalHealthDisOrder } from "@/constants/i18n"
import { MH_JobId_Get, MH_JobId_Post } from "@/constants/jobId"
import { KEYS } from "@/constants/keys"
import fetchData from "@/services/fetchData"
import submitForm from "@/services/submitForm"

import DomesticViolence from "./domesticViolence"
import { text, yesNoQuestion } from "./i18n"
import K6Test from "./k6"
import styles from "./styles.module.css"
import TextGuide from "./TextGuide"
import useDevice from "@/hooks/useDevice"

export default function MentalHealth() {
  const [device] = useDevice()
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" })
  const [submitLoading, setSubmitLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    register("10437", { required: true })
    register("10438")
    register("10441")
    register("12504")
    register("10440")
  }, [register])

  useEffect(() => {
    fetchData(MH_JobId_Get, KEYS, setValue)
  }, [])

  const onSubmit = async (data) => {
    setSubmitLoading(true)
    try {
      await submitForm(MH_JobId_Post, data, () =>
        fetchData(MH_JobId_Get, KEYS, setValue)
      )
      toast.success("اطلاعات با موفقیت ذخیره شد.")
    } catch (err) {
      console.error(err)
    } finally {
      setTimeout(() => setSubmitLoading(false), 1001)
    }
  }

  useEffect(() => {
    if (!watch("10437")?.includes("10652")) {
      setValue("10438", "")
    }
    if (
      !watch("10437")?.includes("1514109071882") &&
      !watch("10437")?.includes("1514109106067")
    ) {
      setValue("10441", "")
    }
  }, [watch("10437"), setValue])

  useEffect(() => {
    if (watch("11892") !== "10361") {
      setValue("12504", "")
      setValue("10440", "")
    }
  }, [watch("11892"), setValue])

  return (
    <>
      <form className={"form"} onSubmit={handleSubmit(onSubmit)}>
        <main
          className={classNames("py-2", styles.container)}
          id="formContainer"
        >
          <section className={styles.titleSection}>
            <p className={styles.description}>{text.description}</p>
          </section>

          <div
            className={classNames(
              styles.gridContainer,
              watch("10437")?.includes("1514109071882") ||
                watch("10437")?.includes("1514109106067") ||
                watch("10437")?.includes("10652")
                ? "bg-gray-e7 rounded-t px-1 pb-3 md:pb-5 mb-0"
                : ""
            )}
          >
            <CheckBoxGroup
              questionKey="10437"
              labelClassName={"min-w-fit"}
              containerClassName="input-card col-span-full"
              label={text.mentalDisorder}
              options={mentalHealthDisOrder}
              errors={errors}
              watch={watch}
              setValue={setValue}
              required
              wrap
            />

            {watch("10437")?.includes("10652") ? (
              <TextField
                containerClassName="input-card !flex-row items-center rounded p-3"
                className={" w-[70%] md:w-[85%]"}
                labelClassName="w-[170px]"
                label={text.typeOfMentalDisease + ":"}
                errors={errors}
                questionKey="10438"
                register={register}
                required
                watch={watch}
              />
            ) : null}

            {watch("10437")?.includes("1514109071882") ||
            watch("10437")?.includes("1514109106067") ? (
              <RadioOptions
                label={text.historyOfSuicideAttempts}
                options={yesNoQuestion}
                active={watch("10441")}
                questionKey={"10441"}
                register={register}
                wrap={true}
                divider={device == "mobile"}
                isError={!!errors[10441]}
                containerClassName="input-card animate-flipLeft !flex-col md:!flex-row"
                optionsContainer={"!flex w-full !justify-between"}
                labelClassName="lg:ml-auto lg:max-w-[220px]"
                radioClassName="lg:max-w-[100px] max-w-[20%]"
              />
            ) : null}
          </div>

          <div
            className={classNames(
              styles.gridContainer,
              watch("11892") === "10361" ? "bg-gray-e7 rounded-t pb-5 mb-0" : ""
            )}
          >
            <RadioOptions
              label={text.currentlyHavingSuicidalThoughts}
              options={yesNoQuestion}
              active={watch("11892")}
              questionKey={"11892"}
              register={register}
              wrap={true}
              isError={!!errors[11892]}
              required={true}
              errors={errors}
              divider={device == "mobile"}
              containerClassName="input-card animate-flipLeft !flex-col md:!flex-row"
              optionsContainer={"!flex w-full !justify-between"}
              labelClassName="lg:ml-auto lg:max-w-[220px]"
              radioClassName="lg:max-w-[100px] max-w-[20%]"
            />

            {watch("11892") === "10361" ? (
              <>
                <RadioOptions
                  label={text.willingnessToTalkWithHealthConsultant}
                  options={yesNoQuestion}
                  active={watch("12504")}
                  questionKey={"12504"}
                  register={register}
                  wrap={true}
                  divider={device == "mobile"}
                  containerClassName="input-card animate-flipLeft !flex-col md:!flex-row"
                  optionsContainer={"!flex w-full !justify-between"}
                  labelClassName="lg:ml-auto lg:max-w-[220px]"
                  radioClassName="lg:max-w-[100px] max-w-[20%]"
                />
                <RadioOptions
                 
                  label={text.historyOfThinkingSuicideAttempts}
                  options={yesNoQuestion}
                  active={watch("10440")}
                  questionKey={"10440"}
                  register={register}
                  wrap={true}
                  divider={device == "mobile"}
                  containerClassName="input-card animate-flipLeft !flex-col md:!flex-row"
                  optionsContainer={"!flex w-full !justify-between"}
                  labelClassName="lg:ml-auto lg:max-w-[220px]"
                  radioClassName="lg:max-w-[100px] max-w-[20%]"
                />
              </>
            ) : null}
          </div>

          <K6Test
            errors={errors}
            watch={watch}
            register={register}
            setValue={setValue}
          />
          <DomesticViolence
            errors={errors}
            watch={watch}
            register={register}
            setValue={setValue}
          />

          <Button
            className="submit"
            title="ذخیره اطلاعات"
            style="outlined"
            type="submit"
            loading={submitLoading}
          />
        </main>
      </form>
      <Modal isOpen={openModal} onClose={() => setOpenModal(null)}>
        <TextGuide text={text.alertSuicidalThoughts} />
      </Modal>
    </>
  )
}
