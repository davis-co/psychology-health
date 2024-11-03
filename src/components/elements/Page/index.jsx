// import React from "react"
import { ProjectName } from '../';
import styles from './styles.module.css';

export default function Page({ children, name, back }) {
    return (
        <div className={styles.page}>
            {/* <Navbar /> */}
            <main className={styles.main}>
                {name ? <ProjectName name={""} back={back} /> : null}
                {children}
            </main>
        </div>
    )
}
