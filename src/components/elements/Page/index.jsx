// import React from "react"
import styles from "./styles.module.css"
// import Navbar from "../Navbar"
import { ProjectName } from ".."

export default function Page({ children, name, back = true }) {
  return (
    <div className={styles.page}>
      {/* <Navbar /> */}
      <main className={styles.main}>
        {name ? <ProjectName name={name} back={back} /> : null}
        {children}
      </main>
    </div>
  )
}
