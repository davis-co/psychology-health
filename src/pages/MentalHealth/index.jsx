import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  Button,
  Modal,
  TextField,
  CheckBoxGroup,
  RadioOptions,
  Page,
} from "react-elements-davis";
import { mentalHealthDisOrder } from "@/constants/i18n";
import { MH_JobId_Get, MH_JobId_Post } from "@/constants/jobId";
import { KEYS } from "@/constants/keys";
import fetchData from "@/services/fetchData";
import submitForm from "@/services/submitForm";
import DomesticViolence from "./domesticViolence";
import { text, yesNoQuestion } from "./i18n";
import K6Test from "./k6";
import styles from "./styles.module.css";
import TextGuide from "./TextGuide";
import useDevice from "@/hooks/useDevice";

export default function MentalHealth() {
  const [device] = useDevice();
  const navigate = useNavigate();
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "all" });
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    register("10437", { required: true });
    register("10438");
    register("10441");
    register("12504");
    register("10440");
  }, [register]);

  useEffect(() => {
    fetchData(MH_JobId_Get, KEYS, setValue);
  }, []);

  const onSubmit = async (data) => {
    try {
      console.log(data);
      await submitForm(MH_JobId_Post, data, () =>
        fetchData(MH_JobId_Get, KEYS, setValue)
      );
      toast.success("اطلاعات با موفقیت ذخیره شد.");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!watch("10437")?.includes("10652")) {
      setValue("10438", "");
    }
    if (
      !watch("10437")?.includes("1514109071882") &&
      !watch("10437")?.includes("1514109106067")
    ) {
      setValue("10441", "");
    }
  }, [watch("10437"), setValue]);

  useEffect(() => {
    if (watch("11892") !== "10361") {
      setValue("12504", "");
      setValue("10440", "");
    }
  }, [watch("11892"), setValue]);

  return (
    <Page navigate={navigate} back>
      <form className={"form"} onSubmit={handleSubmit(onSubmit)}>
        <main
          className={classNames("py-2 ", styles.container)}
          id="formContainer"
        >
          <section className={styles.titleSection}>
            <p className={styles.description}>{text.description}</p>
          </section>

          <div
            className={classNames(
              "grid md:grid-cols-2 lg:grid-cols-3 gap-x-[5vw] gap-y-4 lg:gap-y-6",
              watch("10437")?.includes("1514109071882") ||
                watch("10437")?.includes("1514109106067") ||
                watch("10437")?.includes("10652")
                ? "bg-gray-e7 rounded-t px-1 pb-3 md:pb-5 mb-0"
                : ""
            )}
          >
            <CheckBoxGroup
              questionKey={"10437"}
              containerClassName="col-span-full gap-1"
              label={text.mentalDisorder}
              checkBoxClassName="md:!min-w-[20%] !min-w-[48%]"
              options={mentalHealthDisOrder}
              errors={errors}
              watch={watch}
              register={register}
              setValue={setValue}
              required
              wrap
            />

            {watch("10437")?.includes("10652") ? (
              <TextField
                labelClassName="lg:!text-[11px] xl:!text-sm"
                containerClassName="gap-1"
                label={text.typeOfMentalDisease + ":"}
                errors={errors}
                questionKey="10438"
                register={register}
                required
                watch={watch}
                //divider={device == "mobile"}
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
                //divider={device == "mobile"}
                errors={errors}
                isError={!!errors[10441]}
                optionsContainer={"radioOptions-boolean-optionsContainer"}
                radioClassName="radioOptions-boolean-radio"
                labelClassName="lg:!text-[11px] xl:!text-sm"
                containerClassName="gap-1"
              />
            ) : null}
          </div>

          <div
            className={classNames(
              "grid md:grid-cols-2 lg:grid-cols-3 gap-x-[5vw] gap-y-4 lg:gap-y-6",
              watch("11892") === "10361" ? "bg-gray-e7 rounded-t py-2 mb-0" : ""
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
              //divider={device == "mobile"}
              optionsContainer={"radioOptions-boolean-optionsContainer"}
              radioClassName="radioOptions-boolean-radio"
              labelClassName="lg:!text-[11px] xl:!text-sm"
              containerClassName="gap-1"
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
                  errors={errors}
                  //divider={device == "mobile"}
                  optionsContainer={"radioOptions-boolean-optionsContainer"}
                  radioClassName="radioOptions-boolean-radio"
                  labelClassName="lg:!text-[11px] xl:!text-sm"
                  containerClassName="gap-1"
                />
                <RadioOptions
                  label={text.historyOfThinkingSuicideAttempts}
                  options={yesNoQuestion}
                  active={watch("10440")}
                  questionKey={"10440"}
                  register={register}
                  wrap={true}
                  errors={errors}
                  //divider={device == "mobile"}
                  optionsContainer={"radioOptions-boolean-optionsContainer"}
                  radioClassName="radioOptions-boolean-radio"
                  labelClassName="lg:!text-[11px] xl:!text-sm"
                  containerClassName="gap-1"
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

          <div className="flex justify-center">
            <Button
              variant="outlined"
              type="submit"
              className="submit"
              loading={isSubmitting}
              title="ذخیره اطلاعات"
            />
          </div>
        </main>
      </form>
      <Modal isOpen={openModal} onClose={() => setOpenModal(null)}>
        <TextGuide text={text.alertSuicidalThoughts} />
      </Modal>
    </Page>
  );
}
