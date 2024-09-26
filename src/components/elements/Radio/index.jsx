import React, { forwardRef } from "react"
import styles from "./styles.module.css"
import classNames from "classnames"

const Radio = forwardRef(({ label,customStyle, ...props }, ref) => {
    return (
        <label
            className={classNames(
                styles.container,customStyle,
                props?.checked ? styles.checkedContainer : null,
                props?.disabled ? styles.disabledContainer : null
            )}
        >
            <span className={styles.label}>{label}</span>
            <div
                className={classNames(
                    styles.secondLayer,
                    props?.checked ? styles.secondLayerChecked : ""
                )}
            >
                <div
                    className={classNames(
                        styles.firstLayer,
                        props?.checked ? styles.firstLayerChecked : ""
                    )}
                >
                    <input
                        className={styles.input}
                        ref={ref}
                        type="radio"
                        {...props}
                    />
                </div>
            </div>
        </label>
    )
})

Radio.displayName = "Radio"

export default Radio
