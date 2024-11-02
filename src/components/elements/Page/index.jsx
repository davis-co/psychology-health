// import React from "react"
import styles from './styles.module.css';

export default function Page({ children, name, back }) {
    return (
        <div className={styles.page}>
            {/* <Navbar /> */}
            <main className={styles.main}>
                {/* {name ? <ProjectName name={name} back={back} /> : null} */}
                {children}
            </main>
        </div>
    )
}
