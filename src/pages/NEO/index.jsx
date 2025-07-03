import { useEffect, useState } from "react";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, RadioOptions, Page } from "davis-components";
import { CountdownTimer, FormSteps } from "@/components/elements";
import {
  booleanOptions,
  FORM_SIZE,
  matchOptions,
  Required_Error,
  successMessage,
} from "@/constants/form";
import { NEO_JobId_Get, NEO_JobId_Post } from "@/constants/jobId";
import { NEO_KEYS } from "@/constants/keys";
import fetchData from "@/services/fetchData";
import submitForm from "@/services/submitForm";
import { questions } from "./data";
import { onFinishTime } from "./services";
import styles from "./styles.module.css";
import { text } from "./text";

export default function NEO() {
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "all",
  });
  const [startIndex, setStartIndex] = useState(0);
  const [oldAnimation, setOldAnimation] = useState(false);
  const [newAnimation, setNewAnimation] = useState(false);
  const navigate = useNavigate();
  const initialTime = 7200;

  useEffect(() => {
    fetchData(NEO_JobId_Get, NEO_KEYS, setValue);
    // .finally(() => setFetchLoading(false))
  }, []);

  const goToNext = (data) => {
    if (
      questions
        .slice(startIndex, startIndex + FORM_SIZE)
        .every((q) => watch(q.key))
    ) {
      setOldAnimation(true);
      setNewAnimation(false);
      setTimeout(() => {
        setStartIndex(startIndex + FORM_SIZE);
        setOldAnimation(false);
        setNewAnimation(true);
        document
          .getElementById("formContainer")
          .scrollTo({ top: 0, behavior: "smooth" });
      }, 250);
    }
  };

  const onSubmit = (data) => {
    if (questions.length - startIndex != FORM_SIZE) {
      goToNext();
    }
    submitForm(NEO_JobId_Post, data, () =>
      fetchData(NEO_JobId_Get, NEO_KEYS, setValue)
    ).then(() => {
      toast.success(successMessage);
    });
  };

  return (
    <Page navigate={navigate} back>
      <form
        className={"form !gap-2"}
        onSubmit={handleSubmit(onSubmit)}
        id="formContainer"
      >
        <CountdownTimer
          initialTime={initialTime}
          onComplete={() => {
            onFinishTime();
          }}
        />
        <p className={"guide-description"}>{text.description}</p>
        <FormSteps currentStep={startIndex / FORM_SIZE + 1} />
        <div className="mt-5 grid-1 z-10">
          {questions.slice(startIndex, startIndex + FORM_SIZE).map((q) => (
            <div
              className={classNames(
                "grid-1",
                oldAnimation ? styles.oldAnimation : "",
                newAnimation ? "animate-flipLeft" : ""
              )}
              key={q.label}
            >
              <RadioOptions
                label={q.label}
                questionKey={q.key}
                radioClassName={
                  q.isBoolean
                    ? "!max-w-fit"
                    : " !min-w-[48%] md:!min-w-[19%] !gap-0"
                }
                optionsContainer={q.isBoolean ? "justify-between" : ""}
                validation={{ required: Required_Error }}
                divider={"right"}
                errors={errors}
                active={watch(q.key)}
                register={register}
                options={q.isBoolean ? booleanOptions : matchOptions}
                labelMore={window.innerWidth >= 672}
              />
            </div>
          ))}
        </div>

        <div className="w-full flex justify-center mt-5">
          <Button
            type="submit"
            className="submit"
            loading={isSubmitting}
            title={
              questions.length - startIndex != FORM_SIZE
                ? text.next
                : text.submit
            }
          />
        </div>
      </form>
    </Page>
  );
}
