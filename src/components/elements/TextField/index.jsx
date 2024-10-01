import { forwardRef } from "react"
import classNames from "classnames"
import styles from "../DateInput/styles.module.css"
import Label from "../Label"
import { EditIcon } from "@/assets/icons"

const TextField = forwardRef(
    (
        {
            containerClassName,
            required,
            className,
            label,
            isError = false,
            icon,
            ...props
        },
        ref
    ) => {
        const disabled = props.disabled
        return (
            <div className={classNames(styles.container, containerClassName)}>
                {label ? (
                    <Label
                        title={label}
                        required={required}
                        isError={isError}
                    />
                ) : null}
                <div
                    className={classNames(
                        className,
                        styles.field,
                        disabled ? styles.disabled : null,
                        {
                            [styles.fieldError]: isError,
                        }
                    )}
                >
                    {props.rows > 1 ? (
                        <textarea
                            className={styles.input}
                            {...props}
                            ref={ref}
                        />
                    ) : (
                        <>
                            <input
                                className={styles.input}
                                {...props}
                                ref={ref}
                            />
                        </>
                    )}
                    {props.rows > 1 ? (
                        icon ? (
                            <img className={styles.icon} src={icon} />
                        ) : null
                    ) : (
                        <img
                            className={styles.icon}
                            src={icon ? icon : EditIcon}
                        />
                    )}
                </div>
            </div>
        )
    }
)

TextField.displayName = "TextField"

export default TextField
