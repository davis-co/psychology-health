import React, { useEffect, useState } from "react"
import styles from "./styles.module.css"
import { questions } from "./data"
import {
    Button,
    CountDown,
    Divider,
    FormSteps,
    Label,
    Radio,
} from "@/components/elements"
import { booleanOptions, FORM_SIZE, matchOptions } from "@/constants/form"
import classNames from "classnames"
import { lastPage, onFinishTime } from "./services"
import { text } from "./text"

export default function NEO({ errors, watch, register, submitLoading }) {
    const [startIndex, setStartIndex] = useState(
        0
        // lastPage(
        //     questions.map((q) => q.key),
        //     watch
        // )
    )
    const [oldAnimation, setOldAnimation] = useState(false)
    const [newAnimation, setNewAnimation] = useState(false)

    const goToNext = () => {
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

    return (
        <div className={styles.container} id="formContainer">
            <CountDown
                containerClassName={styles.timer}
                onComplete={() => {
                    onFinishTime()
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
                                q.isBoolean
                                    ? styles.booleanFormItem
                                    : styles.matchFormItem,
                                oldAnimation ? styles.oldAnimation : "",
                                newAnimation ? styles.newAnimation : ""
                            )}
                            key={q.label}
                        >
                            <Label
                                containerClassName={styles.question}
                                title={q.label}
                                required={true}
                                isError={!!errors[q.key]}
                            />
                            <Divider
                                className={`block w-1/2 mx-auto my-3 ${
                                    q.isBoolean ? "md:hidden " : "lg:hidden"
                                }`}
                            />
                            <div
                                className={classNames(styles.radios, {
                                    [styles.error]: !!errors[q.key],
                                })}
                            >
                                {(q.isBoolean
                                    ? booleanOptions
                                    : matchOptions
                                )?.map((o) => (
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
    )
}
