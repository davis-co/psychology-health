import React from "react"
import styles from "./styles.module.css"
import { i18n } from "./i18n"
import Button from "../Button"
import { tableSize } from "@/constants/form"

export default function Pagination({
    page,
    setPage,
    dataLength,
    children,
    ...props
}) {
    return (
        <div className={styles.container}>
            {children}
            <Button
                className={styles.navigate}
                style={page === 1 ? "disabled" : ""}
                title={i18n.prev}
                onClick={() => setPage(Math.max(page - 1, 1))}
            />
            <span className={styles.currentPage}>{page}</span>
            <Button
                className={styles.navigate}
                title={i18n.next}
                style={ page >= Math.floor(dataLength / tableSize) ? "disabled" : ""}
                onClick={() => setPage(page + 1)}
            />
        </div>
    )
}
