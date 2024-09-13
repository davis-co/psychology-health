import React, { useState } from "react"
import styles from "./styles.module.css"
import { questions } from "./data"
import { Button, Divider, Label, Radio } from "@/components/elements"
import { booleanOptions, matchOptions } from "@/constants/form"
import classNames from "classnames"
import { lastPage } from "./services"
import { text } from "./text"

export default function NEO({ errors, watch, register }) {
    const [startIndex, setStartIndex] = useState(
        lastPage(
            questions.map((q) => q.key),
            watch
        ) 
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
                {questions.slice(startIndex, startIndex + 9).map((q, index) => (
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
                            {(q.isBoolean ? booleanOptions : matchOptions)?.map(
                                (o) => (
                                    <Radio
                                        checked={o.value === watch(q.key)}
                                        value={o.value}
                                        label={o.label}
                                        key={o.label + q.label}
                                        {...register(q.key, {
                                            required: true,
                                        })}
                                    />
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {questions.length - startIndex != 9 ? (
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
