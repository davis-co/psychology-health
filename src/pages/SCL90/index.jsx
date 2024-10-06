import React, {
  useEffect,
  useState,
} from 'react';

import { useForm } from 'react-hook-form';

import {
  Button,
  RadioOptions,
  TextField,
} from '@/components/elements';
import { measureOptions } from '@/constants/form';
import {
  SCL_JobId_Get,
  SCL_JobId_Post,
} from '@/constants/jobId';
import { KEYS } from '@/constants/keys';
import fetchData from '@/services/fetchData';
import submitForm from '@/services/submitForm';

import { questions } from './data';
import styles from './styles.module.css';

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
              className={styles.gridcontainer}
              key={q.label}
            >
              {q.isPassword ? (
                <TextField
                containerClassName="flex-row items-center rounded bg-white-light p-3"

                  type="password"
                  label={q.label}
                  required={true}
                  isError={!!errors[q.key]}
                  {...register(q.key)}
                  value={watch(q.key)}
                />
              ) : (
                <div className='col-span-full'>
                <RadioOptions
                labelClassName={"lg:!w-[350px]"}
                label={q.label}
                options={measureOptions}
                questionKey={q.key}
                active={watch(q.key)}
                register={register}
                required={true}
                />
                </div>
               
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
