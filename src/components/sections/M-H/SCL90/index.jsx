import React, { useState } from "react"
import styles from "./styles.module.css"
import { Button, Divider, Label, Radio, TextField } from "@/components/elements"
import classNames from "classnames"
import { measureOptions } from "@/constants/form"
import { text } from "./text"
import { questions } from "./data"
import { lastPage } from "../NEO/services"

export default function SCL90({ errors, watch, register }) {
    const [startIndex, setStartIndex] = useState(0
        // lastPage(
        //     questions.map((q) => q.key),
        //     watch,
        //     questions.length
        // )
    )
    const [oldAnimation, setOldAnimation] = useState(false)
    const [newAnimation, setNewAnimation] = useState(false)

    const goToNext = () => {
        if (
            questions
                .slice(startIndex, startIndex + 9)
                .every((q) => watch(q.key))
        ) {
            setOldAnimation(true)
            setNewAnimation(false)
            setTimeout(() => {
                setStartIndex(startIndex + 9)
                setOldAnimation(false)
                setNewAnimation(true)
                window.scrollTo({ top: 0, behavior: "smooth" })
            }, 250)
        }
    }

    return (
        <>
            <div className={styles.container}>
                {questions.slice(startIndex, startIndex + 27).map((q, index) => (
                    <div
                        className={classNames(
                            q.isPassword
                                ? styles.booleanFormItem
                                : styles.matchFormItem,
                            oldAnimation ? styles.oldAnimation : "",
                            newAnimation ? styles.newAnimation : ""
                        )}
                        key={q.label}
                    >
                        {q.isPassword ? (
                            <TextField
                                type="password"
                                label={q.label}
                                required={true}
                                isError={!!errors[q.key]}
                                {...register(q.key)}
                                value={watch(q.key)}
                            />
                        ) : (
                            <>
                                <Label
                                    title={q.label}
                                    required={true}
                                    isError={!!errors[q.key]}
                                />
                                <Divider
                                    className={`block ${
                                        q.isBoolean ? "md:hidden" : ""
                                    }`}
                                />
                                <div
                                    className={classNames(styles.radios, {
                                        [styles.error]: !!errors[q.key],
                                    })}
                                >
                                    {measureOptions?.map((o) => (
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
                            </>
                        )}
                    </div>
                ))}
            </div>
            {startIndex != questions.length - 1 ? (
                <Button
                    className={styles.next}
                    title={text.next}
                    style="outlined"
                    onClick={() => goToNext()}
                />
            ) : null}
        </>
    )
}
