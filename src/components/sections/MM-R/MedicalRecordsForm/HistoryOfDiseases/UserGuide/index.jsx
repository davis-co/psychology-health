import React from "react"
import styles from "./styles.module.css";

export default function UserGuide({text}) {
    return (
        <div className={styles.container}>
            <p className={styles.text}>{text}</p>
        </div>
    )
}
