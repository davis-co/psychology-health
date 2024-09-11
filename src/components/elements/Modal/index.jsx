import {} from "react"
import { CloseButtonIcon } from "@/assets/icons"
import classNames from "classnames"
import styles from "./styles.module.css"

const Modal = ({ isOpen, onClose, children, className, ...rest }) => {
  const handleClickOutside = (event) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay} onClick={handleClickOutside} {...rest}>
      <div className={classNames(styles.modal, className)}>
        <div className={styles.modalHeader}>
          <Button
            style="outlined"
            className={styles.closeButton}
            icon={
              <img
                className={styles.closeIcon}
                src={CloseButtonIcon}
                alt="closeButton"
              />
            }
            onClick={() => {
              onClose()
            }}
          />
        </div>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  )
}

export default Modal
