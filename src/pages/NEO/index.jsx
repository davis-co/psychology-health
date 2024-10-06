import React, {
  useEffect,
  useState,
} from 'react';

import classNames from 'classnames';
import { useForm } from 'react-hook-form';

import {
  Button,
  CountDown,
  Divider,
  FormSteps,
  RadioOptions,
} from '@/components/elements';
import {
  booleanOptions,
  FORM_SIZE,
  matchOptions,
} from '@/constants/form';
import {
  NEO_JobId_Get,
  NEO_JobId_Post,
} from '@/constants/jobId';
import { KEYS } from '@/constants/keys';
import fetchData from '@/services/fetchData';
import submitForm from '@/services/submitForm';

import { questions } from './data';
import { onFinishTime } from './services';
import styles from './styles.module.css';
import { text } from './text';

export default function NEO() {
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  })
  const [startIndex, setStartIndex] = useState(
    0
    // lastPage(
    //     questions.map((q) => q.key),
    //     watch
    // )
  );
  const [oldAnimation, setOldAnimation] = useState(false);
  const [newAnimation, setNewAnimation] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false)

  const goToNext = () => {
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
  useEffect(() => {
    fetchData(NEO_JobId_Get, KEYS, setValue).catch((err) => console.log(err))
    // .finally(() => setFetchLoading(false))
  }, [])

  const onSubmit = (data) => {
    console.log(data)
    setSubmitLoading(true)
    submitForm(NEO_JobId_Post, data, () =>
      fetchData(NEO_JobId_Get, KEYS, setValue)
    )
      .then(() => {
        toast.success(successMessage)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setTimeout(() => {
          setSubmitLoading(false)
        }, 1001)
      })
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.container} id="formContainer">
          <CountDown
            containerClassName={styles.timer}
            onComplete={() => {
              onFinishTime();
            }}
          />
          <Divider className="my-1 lg:my-1" />
          <p className={styles.intro}>{text.description}</p>
          <FormSteps currentStep={startIndex / FORM_SIZE + 1} />
          <div className={styles.questions}>
            {questions
              .slice(startIndex, startIndex + FORM_SIZE)
              .map((q, index) => (
                <div
                  className={classNames(
                    styles.gridcontainer,
                    // q.isBoolean ? styles.booleanFormItem : styles.matchFormItem,
                    oldAnimation ? styles.oldAnimation : "",
                    newAnimation ? styles.newAnimation : ""
                  )}
                  key={q.label}
                >
                  <div className={q.isBoolean ? "" : 'col-span-full'}>
                    <RadioOptions
                      label={q.label}
                      questionKey={q.key}
                      labelClassName={"lg:!w-[350px]"}
                      required={true}
                      active={watch(q.key)}
                      register={register}
                      options={q.isBoolean ? booleanOptions : matchOptions}
                    />
                  </div>
                </div>
              ))}
          </div>
          {questions.length - startIndex != FORM_SIZE ? (
            <Button
              className={styles.next}
              title={text.next}
              style="outlined"
              onClick={() => goToNext()}
            />
          ) : (
            <Button
              className={styles.next}
              title={text.submit}
              style="outlined"
              loading={submitLoading}
              type="submit"
            />
          )}
        </div>
        {/* <Button
          className={styles.submit}
          title="ذخیره اطلاعات"
          style="outlined"
          type="submit"
          loading={submitLoading}
        /> */}
      </form>
    </>
  );
}
