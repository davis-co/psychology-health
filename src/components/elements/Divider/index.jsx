import React from "react"
import styles from "./styles.module.css"
import classNames from "classnames"

export default function Divider({ className }) {
    return <div className={classNames(styles.container, className)}></div>
}
