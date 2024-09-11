import { forwardRef, useState } from "react"
import classNames from "classnames"
import { BarIcon, GuideIcon } from "@/assets/icons"
import { Modal } from "@/components/elements"
import styles from "./styles.module.css"

const TextInput = forwardRef(
  (
    {
      label,
      labelClassName,
      inDivClassName,
      fieldClassName,
      unit,
      isError = false,
      guideContent,
      archiveContent,
      ...props
    },
    ref
  ) => {
    const [isGuideOpen, setIsGuideOpen] = useState(false)
    const [isArchiveOpen, setIsArchiveOpen] = useState(false)

    return (
      <div className={styles.content}>
        <label
          className={classNames(styles.label, labelClassName)}
          htmlFor={props.id}
        >
          {label}
        </label>
        <div className={classNames(styles.innerDivider, inDivClassName)}>
          <div className={styles.pos}>
            <input
              className={classNames(styles.field, fieldClassName, {
                [styles.fieldError]: isError,
              })}
              {...props}
              ref={ref}
            />
            {!!unit && <span className={styles.span}>{unit}</span>}
          </div>
          {!!guideContent && (
            <div>
              <button
                type="button"
                className={styles.button}
                onClick={() => setIsGuideOpen(true)}
              >
                <img src={GuideIcon} alt="guideIcon" />
              </button>
              <Modal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)}>
                <div>{guideContent}</div>
              </Modal>
            </div>
          )}
          {!!archiveContent && (
            <span>
              <button
                type="button"
                className={styles.button}
                onClick={() => setIsArchiveOpen(true)}
              >
                <img src={BarIcon} />
              </button>
              <Modal
                isOpen={isArchiveOpen}
                onClose={() => setIsArchiveOpen(false)}
              >
                <div>{archiveContent}</div>
              </Modal>
            </span>
          )}
        </div>
      </div>
    )
  }
)

TextInput.displayName = "TextInput"

export default TextInput
