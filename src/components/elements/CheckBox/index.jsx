import { forwardRef, useState } from "react"
import classNames from "classnames"
import { GuideIcon } from "@/assets/icons"
import { Modal } from "@/components/elements"
import styles from "./styles.module.css"

const CheckBox = forwardRef(
  (
    {
      label,
      // labelClassName,
      fieldClassName,
      options,
      guideContent,
      educationalContent,
      ...props
    },
    ref
  ) => {
    const [isGuideOpen, setIsGuideOpen] = useState(false)
    const [isEducationalContentOpen, setIsEducationalContentOpen] =
      useState(false)

    return (
      <div className={styles.content}>
        <div className={styles.questionContent}>
          <label
            // className={classNames(styles.label, labelClassName)}
            htmlFor={props.id}
          >
            {label}
          </label>
          {!!guideContent && (
            <div className={styles.guideContent}>
              <button
                type="button"
                onClick={() => setIsGuideOpen(true)}
                className={styles.guideContentButton}
              >
                <img src={GuideIcon} alt="guideIcon" />
              </button>
              <Modal
                className=""
                isOpen={isGuideOpen}
                onClose={() => setIsGuideOpen(false)}
              >
                <div>{guideContent}</div>
              </Modal>
            </div>
          )}
        </div>
        <div className={styles.checkBoxContent}>
          {options.map((option, index) => (
            <label className={styles.checkBoxLabel} key={index}>
              <input
                className={classNames(styles.checkBoxIcon, fieldClassName)}
                type="checkbox"
                value={option.value}
                {...props}
                ref={ref}
              />
              <span className={styles.checkBoxOption}>{option.label}</span>
            </label>
          ))}
        </div>
        {!!educationalContent && (
          <div>
            <button
              type="button"
              onClick={() => setIsEducationalContentOpen(true)}
            >
              ArchiveIcon
            </button>
            <Modal
              className=""
              isOpen={isEducationalContentOpen}
              onClose={() => setIsEducationalContentOpen(false)}
            >
              <div>{educationalContent}</div>
            </Modal>
          </div>
        )}
      </div>
    )
  }
)

CheckBox.displayName = "CheckBox"

export default CheckBox
