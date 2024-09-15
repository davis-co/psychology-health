import React, { useState } from "react"
import styles from "./styles.module.css"
import { Button, Divider, Label, Radio, TextField } from "@/components/elements"
import classNames from "classnames"
import { measureOptions } from "@/constants/form"
import { text } from "./text"
import { questions } from "./data"
import { lastPage } from "../NEO/services"

export default function SCL90({ errors, watch, register }) {
    return (
        <div className={styles.container}>
            {questions.map((q, index) => (
                <div
                    className={classNames(
                        q.isPassword
                            ? styles.booleanFormItem
                            : styles.matchFormItem
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
                                containerClassName={styles.question}
                                title={q.label}
                                required={true}
                                isError={!!errors[q.key]}
                            />
                            <Divider
                                className={`block w-1/2 mx-auto my-3 ${
                                    q.isPassword ? "md:hidden " : "lg:hidden"
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
    )
}
