import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Button, RadioOptions, TextField, Page } from "react-elements-davis";
import { measureOptions, successMessage } from "@/constants/form";
import { SCL_JobId_Get, SCL_JobId_Post } from "@/constants/jobId";
import { KEYS, SCL90_KEYS } from "@/constants/keys";
import useDevice from "@/hooks/useDevice";
import fetchData from "@/services/fetchData";
import submitForm from "@/services/submitForm";

import { questions } from "./data";
import styles from "./styles.module.css";
import { text } from "./text";

export default function SCL90() {
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "all",
  });

  const navigate = useNavigate();
  const [device] = useDevice();

  useEffect(() => {
    fetchData(SCL_JobId_Get, SCL90_KEYS, setValue);
    // .finally(() => setFetchLoading(false))
  }, []);

  const onSubmit = (data) => {
    console.log("btn clicked");
    console.log(data);
    submitForm(SCL_JobId_Post, data, () =>
      fetchData(SCL_JobId_Get, KEYS, setValue)
    )
      .then(() => {
        toast.success(successMessage);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Page navigate={navigate} back>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <p className={styles.description}>{text.description}</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-[5vw] gap-y-4 lg:gap-y-6">
          {questions.map((q, index) => (
            <RadioOptions
              //labelClassName="!text-center"
              label={q.label}
              options={measureOptions}
              questionKey={q.key}
              active={watch(q.key)}
              register={register}
              required
              errors={errors}
              radioClassName="!min-w-[48%] md:!min-w-[30%] lg:!min-w-[48%] xl:!min-w-[30%] !gap-0"
              labelMore={window.innerWidth >= 672}
              divider={"center"}
            />
          ))}
        </div>
        <div className="w-full flex justify-center mt-10">
          <Button
            variant="outlined"
            type="submit"
            className="submit"
            loading={isSubmitting}
            title={"ذخیره اطلاعات"}
          />
        </div>
      </form>
    </Page>
  );
}
