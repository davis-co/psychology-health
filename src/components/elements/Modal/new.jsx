import React from "react"
import styles from "./styles.module.css"
import { CloseButtonIcon } from "@/assets/icons"
import Button from "../Button"

const Modal = ({ onClose, children }) => {
  return (
    <div className={styles.container} onClick={() => onClose()}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <Button
          style="outlined"
          className={styles.closeButton}
          title="&times;"
          onClick={() => {
            onClose()
          }}
        />
        {children}
      </div>
    </div>
  )
}

export default Modal
