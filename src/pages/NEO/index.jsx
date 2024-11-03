import React, { useState } from 'react';

import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  Button,
  FormSteps,
  RadioOptions,
} from '@/components/elements';
import CountdownTimer from '@/components/elements/CountDown';
import {
  booleanOptions,
  FORM_SIZE,
  matchOptions,
  successMessage,
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
    const [fetchLoading, setFetchLoading] = useState(false);
    const [startIndex, setStartIndex] = useState(0)
    const [oldAnimation, setOldAnimation] = useState(false)
    const [newAnimation, setNewAnimation] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false)
    const navigate =useNavigate() 
    const initialTime = 7200;
    const goToNext = (data) => {
        if (
            questions
                .slice(startIndex, startIndex + FORM_SIZE)
                .every((q) => watch(q.key))
        ) {
            setOldAnimation(true)
            setNewAnimation(false)
            setTimeout(() => {
                setStartIndex(startIndex + FORM_SIZE)
                setOldAnimation(false)
                setNewAnimation(true)
                document
                    .getElementById("formContainer")
                    .scrollTo({ top: 0, behavior: "smooth" })
            }, 250)
        }
    }


    const onSubmit = (data) => {
        if(questions.length - startIndex != FORM_SIZE){
            goToNext()
        }else{
            setSubmitLoading(true)
        submitForm(NEO_JobId_Post, data, () =>
            fetchData(NEO_JobId_Get, KEYS, setValue)
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
        
    }

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={classNames(styles.container, "px-7")} id="formContainer">
                     <CountdownTimer
                        initialTime={initialTime} 
                        onComplete={() => {
                            onFinishTime();
                        }}
                    />
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
                                    <div
                                        className={
                                            q.isBoolean ? "" : "col-span-full"
                                        }
                                    >
                                        <RadioOptions
                                            containerClassName="input-card animate-flipLeft"
                                            label={q.label}
                                            questionKey={q.key}
                                            labelClassName={
                                                "md:!w-[30%] lg:!w-[45%]"
                                            }
                                            required
                                            isError={!!errors[q.key]}
                                            active={watch(q.key)}
                                            register={register}
                                            options={
                                                q.isBoolean
                                                    ? booleanOptions
                                                    : matchOptions
                                            }
                                        />
                                    </div>
                                </div>
                            ))}
                    </div>
                   
                        <Button
                            className={styles.next}
                            title={questions.length - startIndex != FORM_SIZE ? text.next : text.submit}
                            style="outlined"
                            type='submit'
                        />
                    
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
    )
}
