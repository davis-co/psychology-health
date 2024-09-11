import React, { forwardRef } from "react"
import styles from "./styles.module.css"
import { Label, Radio } from "@/components/elements"
import classNames from "classnames"

export default function BooleanFormField({
    className,
    label,
    required,
    options,
    isError,
    value,
    ...props
}) {
    return (
        <label className={classNames(styles.formItem, className)}>
            <Label title={label} required={required} isError={isError} />
            <div
                className={classNames(styles.radios, {
                    [styles.error]: isError,
                })}
            >
                {options?.map((_, i) => (
                    <Radio
                        checked={_.value === value}
                        value={_.value}
                        label={_.label}
                        key={_.label + i}
                        {...props}
                    />
                ))}
            </div>
        </label>
    )
}
