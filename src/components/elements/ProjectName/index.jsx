import React from 'react'
import styles from "./styles.module.css";

export default function PN({name}) {
  return (
    <div className={styles.container}>
      <span className={styles.rightLine}></span>
      <h1 className={styles.name}>{name}</h1>
      <span className={styles.leftLine}></span>
    </div>
  )
}
