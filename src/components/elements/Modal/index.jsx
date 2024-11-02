import { Fragment } from "react"
import { createPortal } from "react-dom"
import Button from "../Button"
import styles from "./styles.module.css"
import classNames from "classnames"

const Modal = ({ onClose, isOpen, children, containerClassName }) => {
    return isOpen
        ? createPortal(
              <Fragment>
                  <div className={styles.container} onClick={() => onClose()}>
                      <div
                          className={classNames(
                              containerClassName,
                              styles.modal
                          )}
                          onClick={(e) => e.stopPropagation()}
                      >
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
              </Fragment>,

              // eslint-disable-next-line no-undef
              modal
          )
        : null
}

export default Modal
