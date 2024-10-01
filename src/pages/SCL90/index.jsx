import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import {
  Button,
  Divider,
  Label,
  Radio,
  TextField,
} from "@/components/elements";
import classNames from "classnames";
import { measureOptions } from "@/constants/form";
import { text } from "./text";
import { questions } from "./data";
import { lastPage } from "../NEO/services";
import submitForm from "@/services/submitForm";
import fetchData from "@/services/fetchData";
import { SCL_JobId_Get, SCL_JobId_Post } from "@/constants/jobId";
import { useForm } from "react-hook-form";
import { KEYS } from "@/constants/keys";

export default function SCL90() {
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    fetchData(SCL_JobId_Get, KEYS, setValue).catch((err) => console.log(err));
    // .finally(() => setFetchLoading(false))
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    setSubmitLoading(true);
    submitForm(SCL_JobId_Post, data, () =>
      fetchData(SCL_JobId_Get, KEYS, setValue)
    )
      .then(() => {
        toast.success(successMessage);
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
  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.container}>
          {questions.map((q, index) => (
            <div
              className={classNames(
                q.isPassword ? styles.booleanFormItem : styles.matchFormItem
              )}
              key={q.label}
            >
              {q.isPassword ? (
                <TextField
                  type="password"
                  label={q.label}
                  required={true}
                  isError={!!errors[q.key]}
                  {...register(q.key)}
                  value={watch(q.key)}
                />
              ) : (
                <>
                  <Label
                    containerClassName={styles.question}
                    title={q.label}
                    required={true}
                    isError={!!errors[q.key]}
                  />
                  <Divider
                    className={`block w-1/2 mx-auto my-3 ${
                      q.isPassword ? "md:hidden " : "lg:hidden"
                    }`}
                  />
                  <div
                    className={classNames(styles.radios, {
                      [styles.error]: !!errors[q.key],
                    })}
                  >
                    {measureOptions?.map((o) => (
                      <Radio
                        checked={o.value === watch(q.key)}
                        value={o.value}
                        label={o.label}
                        key={o.label + q.label}
                        {...register(q.key, {
                          required: true,
                        })}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        <Button
          className={styles.submit}
          title="ذخیره اطلاعات"
          style="outlined"
          type="submit"
          loading={submitLoading}
        />
      </form>
    </>
  );
}
