import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import classNames from "classnames";
import { mentalHealthDisOrder, text, yesNoQuestion } from "./i18n";

import {
  Button,
  CheckBox,
  Divider,
  Label,
  Page,
  Radio,
  TextField,
} from "@/components/elements";
import K6Test from "./k6";
import DomesticViolence from "./domesticViolence";
import { useForm } from "react-hook-form";
import { i18n } from "../Home/i18n";
import CheckBoxGroup from "@/components/elements/CheckBox/CheckBoxGroup";
import { MH_JobId_Get, MH_JobId_Post } from "@/constants/jobId";
import fetchData from "@/services/fetchData";
import { KEYS } from "@/constants/keys";
import submitForm from "@/services/submitForm";
import TextGuide from "./TextGuide";
import { createPortal } from "react-dom";
import Modal from "@/components/elements/Modal/new";
import { toast } from "react-toastify";

export default function MentalHealth() {
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const [pointK6, setPointK6] = useState(0);
  const [pointDomestic, setPointDomestic] = useState(0);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [openModal, setOpernModal] = useState(false);
  useEffect(() => {
    fetchData(MH_JobId_Get, KEYS, setValue)
    .then(res=>console.log(res))
    .catch((err) => console.log(err));
    
    // .finally(() => setFetchLoading(false))
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    setSubmitLoading(true);
    submitForm(MH_JobId_Post, data, () =>
      fetchData(MH_JobId_Get, KEYS, setValue)
    )
      .then(() => {
        toast.success("اطلاعات با موفقیت ذخیره شد.");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => {
          setSubmitLoading(false);
        }, 1001);
      });
  };
console.log(watch("10437"))
  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <main className={styles.container} id="formContainer">
          <section className={styles.titleSection}>
            <h5 className={styles.title}>{text.title}</h5>
            <p className={styles.description}>{text.description}</p>
          </section>
          <div className={styles.questionPart}>
            <section className={styles.chekboxPart}>
              <div className=" flex-auto">
                <Label
                  className={styles.question}
                  title={text.mentalDisorder}
                  required={true}
                  isError={!!errors[10437]}
                />
              </div>

              {mentalHealthDisOrder?.map((o , index) => (
               
                <div key={o.index } className={classNames(styles.radios, "flex-auto")}>
                  <CheckBox
                    value={o.value}
                    label={o.label}
                    // key={o.value}
                    checked={watch("10437")?.includes(o.value)}
                    onChange={(e) => {
                      const values = watch("10437") || [];
                      if (e.target.checked) {
                        setValue("10437", [...values, o.value]);
                      } else {
                        setValue(
                          "10437",
                          values.filter((val) => val !== o.value)
                        );
                      }
                    }}
                    // {...register("10437", { required: true })}
                  />
                </div>
              ))}
            </section>
            {watch("10437")?.includes("10652") ? (
              <section className={styles.booleanFormItem}>
                <div className="flex-1">
                  <TextField
                    containerClassName={
                      "form-item flex-row items-center lg:gap-10"
                    }
                    className={"md:w-[85%] xs:w-[70%] "}
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
              <div className={styles.onePartQuestion}>
                <section className={styles.booleanFormItem}>
                  <Label
                    className={styles.question}
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
              </div>
            ) : null}
          </div>
          <div className={styles.twoPartQuestion}>
            <section className={classNames(styles.booleanFormItemTwo)}>
              <Label
                className={styles.question}
                title={text.currentlyHavingSuicidalThoughts}
                required={true}
                userGuide={<TextGuide text={text.guidePopUpSuicidalThoughts} />}
                // userGuide=<div className="p-5 lg:text-[16px]">{text.guidePopUpSuicidalThoughts}</div>
                isError={!!errors[11892]}
              />
              <div className={classNames(styles.radios)}>
                {yesNoQuestion?.map((o) => (
                  <Radio
                    onClick={(e) => {
                      console.log(e.target.value);
                      const event = e.target.value;
                      if (event === "10362" && watch("11892") !== "10362") {
                        setOpernModal(true);
                      }
                    }}
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
              <section className={styles.booleanFormItemTwo}>
                <Label
                  className={styles.question}
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
            watch("10437")?.includes("1514190240786") ||
            watch("10437")?.includes("10652") ||
            watch("10437")?.includes("10653")) ? (
            <div className={styles.onePartQuestion}>
              <section className={styles.booleanFormItem}>
                <Label
                  className={styles.question}
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
            </div>
          ) : null}
          <Divider className="block w-1/2 mx-auto my-3 " />
          <K6Test
            errors={errors}
            watch={watch}
            register={register}
            setValue={setValue}
            pointK6={pointK6}
            setPointK6={setPointK6}
          />

          <DomesticViolence
            errors={errors}
            watch={watch}
            register={register}
            setValue={setValue}
            setPointDomestic={setPointDomestic}
            pointDomestic={pointDomestic}
          />
        </main>

        <Button
          className={styles.submit}
          title="ذخیره اطلاعات"
          style="outlined"
          type="submit"
          loading={submitLoading}
        />
      </form>
      {openModal
        ? createPortal(
            <Modal
              onClose={() => {
                setOpernModal(false);
              }}
            >
              <TextGuide text={text.alertSuicidalThoughts} />
            </Modal>,
            modal
          )
        : null}
    </>

  );
}
