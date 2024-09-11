import { Fragment } from "react/jsx-runtime"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import styles from "./styles.module.css"
// components
import { Button, ProjectName } from "@/components/elements"
import MedicalRecordsForm from "@/components/sections/MM-R/MedicalRecordsForm"
import MedicineRecordsForm from "@/components/sections/MM-R/MedicineRecordsForm"

// keys
import { Medical_RF_keys } from "@/components/sections/MM-R/MedicalRecordsForm/data"
import { Medicine_RF_keys } from "@/components/sections/MM-R/MedicineRecordsForm/data"

// jobIds
import { MR_JobId_Get, MR_JobId_Post } from "@/constants/jobId"

// services
import fetchData from "@/services/fetchData"
import submitForm from "@/services/submitForm"
import { successMessage } from "@/constants/form"
import { setSelectErrors } from "@/states/reducers/serverData"
import { selectInputKeys } from "@/constants/form"
import { selectValidation } from "@/components/elements/Select/services"

export const CreateForm = ({ keys, hasSubmit, projectName }) => {
    const dispatch = useDispatch()
    const [submitLoading, setSubmitLoading] = useState(false)
    const [fetchLoading, setFetchLoading] = useState(false)
    const {
        control,
        register,
        setValue,
        setError,
        // reset,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "all",
    })
    const sections = []

    useEffect(() => {
        setSubmitLoading(true)
        fetchData(MR_JobId_Get, keys, setValue)
            .catch((err) => console.log(err))
            .finally(() => setSubmitLoading(false))
    }, [])

    if (projectName) {
        sections.push(<ProjectName name={projectName} />)
    }

    if (Medical_RF_keys.every((key) => keys[key])) {
        sections.push(
            <MedicalRecordsForm
                errors={errors}
                watch={watch}
                register={register}
                control={control}
                setValue={setValue}
            />
        )
    }
    if (Medicine_RF_keys.every((key) => keys[key])) {
        sections.push(
            <MedicineRecordsForm
                errors={errors}
                watch={watch}
                register={register}
                control={control}
                setValue={setValue}
            />
        )
    }

    if (hasSubmit) {
        sections.push(
            <Button
                className={styles.submit}
                title={"ذخیره اطلاعات"}
                style="outlined"
                type="submit"
                loading={submitLoading}
            />
        )
    }

    const onSubmit = (data) => {
        // validate select form
        if (selectValidation(watch, dispatch)) {
            setSubmitLoading(true)
            submitForm(MR_JobId_Post, data, () =>
                fetchData(MR_JobId_Get, keys, setValue)
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
                    }, 1000)
                })
        }
    }

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
    )
}
