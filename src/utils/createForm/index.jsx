import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Fragment } from "react/jsx-runtime";

// components
import { Button, ProjectName } from "react-elements-davis";
import { successMessage } from "@/constants/form";
import Loading from "@/pages/Loading";
import Home from "@/pages/M-H/Home";
import MentalHealth from "@/pages/M-H/MentalHealth";
import NEO from "@/pages/NEO";
import { validateForm } from "@/pages/NEO/services";
import SCL90 from "@/pages/SCL90";
import { questions as SCL90Questions } from "@/pages/SCL90/data";
// jobIds
// services
import fetchData from "@/services/fetchData";
import submitForm from "@/services/submitForm";

import styles from "./styles.module.css";

export const CreateForm = ({ page, setPage }) => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const {
    control,
    register,
    setValue,
    setError,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  const sections = [];

  useEffect(() => {
    const jobId = page?.jobIds?.fetchJobId;
    if (jobId) {
      setFetchLoading(true);
      fetchData(jobId, page.keys, setValue)
        .catch((err) => console.log(err))
        .finally(() => setFetchLoading(false));
    }
    {
      reset({}, { keepValues: false });
    }
  }, [page]);

  if (page.name) {
    sections.push(<ProjectName name={page.name} />);
  }

  if (page.name === "تست NEO") {
    sections.push(
      <NEO
        errors={errors}
        watch={watch}
        register={register}
        control={control}
        setValue={setValue}
        submitLoading={submitLoading}
      />
    );
  } else if (page.name === "تست SCL90") {
    if (SCL90Questions.map((q) => q.key).every((key) => page.keys[key])) {
      sections.push(
        <SCL90
          errors={errors}
          watch={watch}
          register={register}
          control={control}
          setValue={setValue}
        />
      );
    }
  } else if (page.name === "تست سلامت روان") {
    sections.push(
      <MentalHealth
        errors={errors}
        watch={watch}
        register={register}
        control={control}
        setValue={setValue}
      />
    );
  } else {
    sections.push(<Home setPage={setPage} />);
  }

  if (page.submit && validateForm(page.keys, watch)) {
    sections.push(
      <Button
        id={"submitButton"}
        className={styles.submit}
        title={"ذخیره اطلاعات"}
        sstyle="outlined"
        type="submit"
        loading={submitLoading}
      />
    );
  }

  const onSubmit = (data) => {
    // validate select form
    setSubmitLoading(true);
    const getJobId = page?.jobIds?.fetchJobId;
    const postJobId = page?.jobIds?.fetchJobId;
    submitForm(postJobId, data, () => fetchData(getJobId, page.keys, setValue))
      .then(() => {
        toast.success(successMessage);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => {
          setSubmitLoading(false);
        }, 1000);
      });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {fetchLoading ? (
        <Loading />
      ) : (
        sections.map((section, index) => (
          <Fragment key={index}>{section}</Fragment>
        ))
      )}
    </form>
  );
};
