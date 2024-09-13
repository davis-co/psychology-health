import React from "react"
import { pages } from "./data"
import styles from "./styles.module.css";
import { Card } from "@/components/elements";

export default function Home({ setPage }) {
    return (
        <div className={styles.container}>
            {pages.map((page) => (
                <Card page={page} setPage={setPage} />
            ))}
        </div>
    )
}
