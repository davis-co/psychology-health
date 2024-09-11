import React from "react"
import classNames from "classnames"
import styles from "./styles.module.css"

export default function CheckBox({ label, ref, ...props }) {
    return (
        <label
            className={classNames(
                styles.container,
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
                    <input className={styles.input} type="checkbox" {...props} />
                </div>
            </div>
        </label>
    )
}
