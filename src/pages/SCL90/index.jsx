import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Button, RadioOptions, Page } from "react-elements-davis"
import { measureOptions, successMessage } from "@/constants/form"
import { SCL_JobId_Get, SCL_JobId_Post } from "@/constants/jobId"
import { KEYS, SCL90_KEYS } from "@/constants/keys"
import fetchData from "@/services/fetchData"
import submitForm from "@/services/submitForm"
import { questions } from "./data"
import styles from "./styles.module.css"
import { text } from "./text"

export default function SCL90() {
    const {
        watch,
        register,
        setValue,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: "all",
    })

    const navigate = useNavigate()

    useEffect(() => {
        fetchData(SCL_JobId_Get, SCL90_KEYS, setValue)
        // .finally(() => setFetchLoading(false))
    }, [])

    const onSubmit = (data) => {
        console.log("btn clicked")
        console.log(data)
        submitForm(SCL_JobId_Post, data, () =>
            fetchData(SCL_JobId_Get, KEYS, setValue)
        )
            .then(() => {
                toast.success(successMessage)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <Page navigate={navigate} back>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <p className={styles.description}>{text.description}</p>
                <div className="grid-3">
                    {questions.map((q) => (
                        <RadioOptions
                            key={q.label}
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
                <div className="form-buttons">
                    <Button
                        type="submit"
                        className="submit"
                        loading={isSubmitting}
                        title={"ذخیره اطلاعات"}
                    />
                </div>
            </form>
        </Page>
    )
}
