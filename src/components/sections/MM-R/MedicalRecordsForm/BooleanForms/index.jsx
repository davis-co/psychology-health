import React, { useEffect, useState } from "react"
import styles from "./styles.module.css"
import { i18n } from "./i18n.js"
import { booleanOptions } from "@/constants/form.js"
import { formItems } from "./data.jsx"
import {
    BooleanFormField,
    Divider,
    Label,
    Radio,
    TextField,
} from "@/components/elements/index.js"
import classNames from "classnames"
import SDGuide from "./SexualDangerousGuide/index.jsx"

export default function BF({ setValue, errors, watch, register }) {
    const [showTextField, setShowTextField] = useState(false)
    return (
        <div className={styles.container}>
            {formItems.map((bo, i) => (
                <label className={styles.formItem} key={bo?.label + i}>
                    <Label
                        userGuide={bo.userGuide}
                        title={bo.label}
                        required={true}
                        isError={!!errors[bo.key]}
                    />
                    <Divider className="block md:hidden" />
                    <div
                        className={classNames(styles.radios, {
                            [styles.error]: !!errors[bo.key],
                        })}
                    >
                        {booleanOptions?.map((o, i) => (
                            <Radio
                                checked={o.value === watch(bo.key)}
                                value={o.value}
                                label={o.label}
                                key={o.label + i}
                                {...register(bo.key, {
                                    required: true,
                                })}
                            />
                        ))}
                    </div>
                </label>
            ))}
            <div className={styles.dependForm}>
                <label className={styles.formItem}>
                    <Label
                        title={i18n.historyOfSurgery || "reza"}
                        required={true}
                        isError={!!errors["1562152965099"]}
                    />
                    <Divider className="block md:hidden" />
                    <div
                        className={classNames(styles.radios, {
                            [styles.error]: !!errors["1562152965099"],
                        })}
                    >
                        {booleanOptions?.map((o, i) => (
                            <Radio
                                checked={o.value === watch("1562152965099")}
                                value={o.value}
                                label={o.label}
                                key={o.label + i}
                                {...register("1562152965099", {
                                    required: true,
                                })}
                            />
                        ))}
                    </div>
                </label>
                <TextField
                    containerClassName={classNames(
                        styles.textFieldContainer,
                        watch("1562152965099") == 10361 ? "" : "hidden"
                    )}
                    label={i18n.typeOfSurgery}
                    required={true}
                    placeholder={i18n.enterTheNamesOfYourSurgey}
                    isError={!!errors[1562153059740]}
                    {...register("1562153059740")}
                    value={watch("1562153059740")}
                />
            </div>
        </div>
    )
}
