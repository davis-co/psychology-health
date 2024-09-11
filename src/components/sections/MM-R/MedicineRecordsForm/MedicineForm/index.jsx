import React, { useEffect, useState } from "react"
import styles from "./styles.module.css"
import { booleanOptions } from "@/constants/form"
import { i18n } from "../i18n"
import { usageType } from "../data"
import {
    TextField,
    BooleanFormField,
    Button,
    Label,
    Radio,
    Divider,
} from "@/components/elements"
import classNames from "classnames"
import { addDrug } from "../MedicineTable/services"

export default function MedicineForm({ register, setValue, watch, errors }) {
    const [errorsList, setErrorsList] = useState(null)
    const [showForm, setShowForm] = useState(false)
    return (
        <div className={styles.container}>
            <label className={classNames(styles.bfi, styles.formItem)}>
                <Label
                    title={i18n.usedDrugNowOrPastMonth}
                    required={true}
                    isError={!!errors["12411"]}
                />
                <Divider className="block md:hidden" />
                <div
                    className={classNames(styles.radios, {
                        [styles.error]: !!errors["12411"],
                    })}
                >
                    {booleanOptions?.map((o, i) => (
                        <Radio
                            checked={o.value === watch("12411")}
                            value={o.value}
                            label={o.label}
                            key={o.label + i}
                            {...register("12411", {
                                required: true,
                            })}
                        />
                    ))}
                </div>
            </label>
            {watch("12411") === "10361" ? (
                <>
                    <TextField
                        containerClassName={styles.textFieldContainer}
                        label={i18n.usingDrugName}
                        required={true}
                        placeholder={i18n.enterTheTitle}
                        isError={
                            errorsList?.includes("10520") && !watch("10520")
                        }
                        onSubmit={(e) => addDrug(watch, setValue)}
                        {...register("10520")}
                        value={watch("10520")}
                    />
                    <TextField
                        containerClassName={styles.textFieldContainer}
                        label={i18n.usageTime}
                        placeholder={i18n.usageTimeInMonth}
                        isError={!!errors[10577]}
                        onSubmit={(e) => addDrug(watch, setValue)}
                        {...register("10577")}
                        value={watch("10577")}
                    />
                    <TextField
                        containerClassName={styles.textFieldContainer}
                        label={i18n.usageReason}
                        placeholder={i18n.usageTimeInMonth}
                        isError={!!errors[10575]}
                        onSubmit={(e) => addDrug(watch, setValue)}
                        {...register("10575")}
                        value={watch("10575")}
                    />
                    <TextField
                        containerClassName={styles.textFieldContainer}
                        label={i18n.usageDose}
                        placeholder={i18n.dose}
                        isError={!!errors[12754]}
                        onSubmit={(e) => addDrug(watch, setValue)}
                        {...register("12754")}
                        value={watch("12754")}
                    />
                    <label
                        className={classNames(styles.bfi, styles.formItem)}
                        onClick={() => setErrorsList(null)}
                    >
                        <Label
                            title={i18n.usageType}
                            required={true}
                            isError={errorsList?.includes("10522")}
                        />
                        <Divider className="block md:hidden" />
                        <div
                            className={classNames(styles.radios, {
                                [styles.error]: errorsList?.includes("10522"),
                            })}
                        >
                            {usageType?.map((o, i) => (
                                <Radio
                                    checked={o.value === watch("10522")}
                                    value={o.value}
                                    label={o.label}
                                    key={o.label + i}
                                    {...register("10522")}
                                />
                            ))}
                        </div>
                    </label>
                    <label
                        className={classNames(styles.bfi, styles.formItem)}
                        onClick={() => setErrorsList(null)}
                    >
                        <Label
                            title={i18n.isPrescribed}
                            required={true}
                            isError={errorsList?.includes("12750")}
                        />
                        <Divider className="block md:hidden" />
                        <div
                            className={classNames(styles.radios, {
                                [styles.error]: errorsList?.includes("12750"),
                            })}
                        >
                            {booleanOptions?.map((o, i) => (
                                <Radio
                                    checked={o.value === watch("12750")}
                                    value={o.value}
                                    label={o.label}
                                    key={o.label + i}
                                    {...register("12750")}
                                />
                            ))}
                        </div>
                    </label>
                    <div className={styles.actions}>
                        <Button
                            style="outlined"
                            title={i18n.add}
                            className={styles.addButton}
                            onClick={() =>
                                addDrug(watch, setValue, setErrorsList)
                            }
                        />
                    </div>
                </>
            ) : null}
        </div>
    )
}
