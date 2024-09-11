import classNames from "classnames"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { Controller } from "react-hook-form"
import DatePicker from "react-multi-date-picker"
import { EventIcon } from "@/assets/icons"
import styles from "./styles.module.css"
import Label from "../Label"

const DateInput = ({
    label,
    id,
    control,
    containerClassName,
    fieldClassName,
    required,
    labelClassName,
    isError = false,
}) => {
    return (
        <div className={classNames(styles.content, containerClassName)}>
            <Label title={label} required={required} isError={isError} />
            <div className={classNames(styles.innerDivider, fieldClassName)}>
                <div className={styles.pos}>
                    <Controller
                        control={control}
                        name={id}
                        render={({ field: { onChange, value } }) => (
                            <DatePicker
                                containerClassName="w-full"
                                render={
                                    <input
                                        id={id}
                                        placeholder="روز/ ماه/ سال"
                                        className={classNames(
                                            styles.dateField,
                                            {
                                                [styles.fieldError]: isError,
                                            }
                                        )}
                                    />
                                }
                                calendar={persian}
                                locale={persian_fa}
                                format="YYYY/MM/DD"
                                calendarPosition="top"
                                fixMainPosition={false}
                                showOtherDays
                                fixRelativePosition={false}
                                value={value || ""}
                                onChange={(date) => {
                                    onChange(date ? date.toString() : "")
                                }}
                                id={id}
                            />
                        )}
                    />
                    <img className={styles.icon} src={EventIcon} />
                </div>
            </div>
        </div>
    )
}

export default DateInput
