import { useEffect, useState } from "react"
import MedicineTable from "./MedicineTable"
import {
    AlarmIcon,
    CalendarClockIcon,
    DropperIcon,
    DrugsIcon,
    SickIcon,
    StethoscopeIcon,
} from "@/assets/icons"
import {
    Button,
    RadioButton,
    TextField,
    Modal,
    Pagination,
} from "@/components/elements"
import { usageType } from "./data"
import { booleanOptions } from "@/constants/form"
import styles from "./styles.module.css"
import { i18n } from "./i18n"
import MedicineForm from "./MedicineForm"

const MedicineRecordsForm = ({ errors, watch, register, setValue }) => {
    return (
        <div className={styles.container}>
            <strong className={styles.title}>{i18n.title}</strong>
            <div className={styles.sections}>
                <MedicineForm
                    errors={errors}
                    register={register}
                    setValue={setValue}
                    watch={watch}
                />
                {watch("12411") === "10361" ? (
                    watch("10997")?.length ? (
                        <MedicineTable
                            watch={watch}
                            tableData={watch("10997")}
                            setValue={setValue}
                        />
                    ) : null
                ) : null}
            </div>
        </div>
    )
}

export default MedicineRecordsForm
