// import React from "react"
import styles from "./styles.module.css"
// import Navbar from "../Navbar"
import { ProjectName } from ".."

export default function Page({ children, name }) {
    return (
        <div className={styles.page}>
            {/* <Navbar /> */}
            <main className={styles.main}>
                {name ? <ProjectName name={name} /> : null}
                {children}
            </main>
        </div>
    )
}
