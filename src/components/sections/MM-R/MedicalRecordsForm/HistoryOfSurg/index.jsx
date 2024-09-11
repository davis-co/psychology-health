import React from "react"
import { i18n } from "./i18n"
import { booleanOptions } from "@/constants/form"
import { BooleanFormField, Divider, Label, Radio } from "@/components/elements"
import styles from "./styles.module.css"
import classNames from "classnames"

export default function HOS({ value, register, isError }) {
    return (
        <div className={styles.container}>
            <label className={styles.formItem}>
                <Label
                    title={i18n.historyOfRadioChemoSurg}
                    required={true}
                    isError={isError}
                />
                <Divider className="block md:hidden" />
                <div
                    className={classNames(styles.radios, {
                        [styles.error]: isError,
                    })}
                >
                    {booleanOptions?.map((o, i) => (
                        <Radio
                            checked={o.value === value}
                            value={o.value}
                            label={o.label}
                            key={o.label + i}
                            {...register("10567", {
                                required: true,
                            })}
                        />
                    ))}
                </div>
            </label>
        </div>
    )
}
