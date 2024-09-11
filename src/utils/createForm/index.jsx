import { Fragment } from "react/jsx-runtime"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import styles from "./styles.module.css"
// components
import { Button, ProjectName } from "@/components/elements"

// keys

// jobIds

// services
import fetchData from "@/services/fetchData"
import submitForm from "@/services/submitForm"
import { successMessage } from "@/constants/form"
import { questions as NeoQuestions } from "@/components/sections/M-H/NEO/data"
import { pages } from "@/constants/pages"
import NEO from "@/components/sections/M-H/NEO"
import Loading from "@/components/sections/Loading"

export const CreateForm = ({ page, hasSubmit, projectName }) => {
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
        const jobId = page?.jobIds?.fetchJobId
        if (jobId) {
            setFetchLoading(true)
            fetchData(jobId, pages[page], setValue)
                .catch((err) => console.log(err))
                .finally(() => setFetchLoading(false))
        }
    }, [])

    if (projectName) {
        sections.push(<ProjectName name={projectName} />)
    }

    if (NeoQuestions.map((q) => q.key).every((key) => page.keys[key])) {
        sections.push(
            <NEO
                errors={errors}
                watch={watch}
                register={register}
                control={control}
                setValue={setValue}
            />
        )
    }

    if (page.submit) {
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
        setSubmitLoading(true)
        const getJobId = page?.jobIds?.fetchJobId
        const postJobId = page?.jobIds?.fetchJobId
        submitForm(postJobId, data, () =>
            fetchData(getJobId, page.keys, setValue)
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
