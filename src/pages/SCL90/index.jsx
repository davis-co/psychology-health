import React, {
  useEffect,
  useState,
} from 'react';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  Button,
  RadioOptions,
  TextField,
} from '@/components/elements';
import {
  measureOptions,
  successMessage,
} from '@/constants/form';
import {
  SCL_JobId_Get,
  SCL_JobId_Post,
} from '@/constants/jobId';
import {
  KEYS,
  SCL90_KEYS,
} from '@/constants/keys';
import useDevice from '@/hooks/useDevice';
import fetchData from '@/services/fetchData';
import submitForm from '@/services/submitForm';

import { questions } from './data';
import styles from './styles.module.css';
import { text } from './text';

export default function SCL90() {
    const {
        watch,
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "all",
    })

    const [submitLoading, setSubmitLoading] = useState(false)
    const navigate = useNavigate()
    const [device] = useDevice()

    useEffect(() => {
        fetchData(SCL_JobId_Get, SCL90_KEYS, setValue)
        // .finally(() => setFetchLoading(false))
    }, [])

    const onSubmit = (data) => {
        setSubmitLoading(true)
        submitForm(SCL_JobId_Post, data, () =>
            fetchData(SCL_JobId_Get, KEYS, setValue)
        )
            .then(() => {
                toast.success(successMessage)
                navigate(-1)
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
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.container}>
                    <p className={styles.description}>{text.description}</p>
                    {questions.map((q, index) => (
                        <div className={styles.gridcontainer} key={q.label}>
                            {q.isPassword ? (
                                <TextField
                                    containerClassName="input-card !flex-row items-center rounded p-3"
                                    className="!rounded-md lg:w-[60%]"
                                    type="password"
                                    label={q.label}
                                    required
                                    questionKey={q.key}
                                    errors={errors}
                                    register={register}
                                    value={watch(q.key)}
                                    watch={watch}
                                />
                            ) : (
                                <div className="col-span-full">
                                    <RadioOptions
                                        containerClassName="input-card animate-flipLeft !flex-col !gap-1 md:!flex-row"
                                        labelClassName={
                                            "text-center md:text-right md:!w-[30%] lg:!w-[35%] xl:!w-[40%] sm:ml-5"
                                        }
                                        optionsContainer="flex-wrap justify-center"
                                        radioClassName="!mr-0 !max-w-[33%] flex-1"
                                        label={q.label}
                                        divider={device=="mobile"}

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
                    className="submit"
                    title="ذخیره اطلاعات"
                    style="outlined"
                    type="submit"
                    loading={submitLoading}
                />
            </form>
        </>
    )
}
