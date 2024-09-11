import { forwardRef, useState } from "react"
import classNames from "classnames"
import styles from "./styles.module.css"
import Label from "../Label"

const TextField = forwardRef(
    (
        {
            containerClassName,
            required,
            className,
            label,
            isError = false,
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

                {props.rows > 1 ? (
                    <textarea
                        className={classNames(
                            styles.field,
                            disabled ? styles.disabled : null,
                            {
                                [styles.fieldError]: isError,
                            }
                        )}
                        {...props}
                        ref={ref}
                    />
                ) : (
                    <input
                        className={classNames(
                            styles.field,
                            disabled ? styles.disabled : null,
                            {
                                [styles.fieldError]: isError,
                            },
                            className
                        )}
                        {...props}
                        ref={ref}
                    />
                )}
            </div>
        )
    }
)

TextField.displayName = "TextField"

export default TextField
