import { forwardRef, useState } from "react"
import classNames from "classnames"
import { Modal } from "@/components/elements"
import { EducationalContentIcon, GuideIcon } from "@/assets/icons"
import styles from "./styles.module.css"
import { text } from "./text"

const RadioButton = forwardRef(
  (
    {
      label,
      labelClassName,
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
            className={classNames(styles.label, labelClassName)}
            htmlFor={props.id}
          >
            {label}
          </label>
          {!!guideContent && (
            <div className={styles.guideContent}>
              <button
                type="button"
                className={styles.guideContentButton}
                onClick={() => setIsGuideOpen(true)}
              >
                <img src={GuideIcon} alt="guideIcon" />
              </button>
              <Modal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)}>
                <div>{guideContent}</div>
              </Modal>
            </div>
          )}
        </div>
        <div className={classNames(styles.radioContent, fieldClassName)}>
          {options.map((option, index) => (
            <label className={styles.radioLabel} key={index}>
              <input
                className={styles.radioInput}
                type="radio"
                value={option.value}
                {...props}
                ref={ref} 
              />
              <span className={styles.radioSpan}>{option.label}</span>
            </label>
          ))}
        </div>
        {!!educationalContent && (
          <div className={styles.educationalContentWrapper}>
            <button
              type="button"
              className={styles.educationalContentButton}
              onClick={() => setIsEducationalContentOpen(true)}
            >
              <img src={EducationalContentIcon} alt="educationalContentIcon" />
              <p>{text.readMore}</p>
            </button>
            <Modal
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

RadioButton.displayName = "RadioButton"

export default RadioButton
