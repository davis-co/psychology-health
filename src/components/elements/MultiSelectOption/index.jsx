import { useEffect, useState } from "react"
import classNames from "classnames"
import { Controller } from "react-hook-form"
import {
  EducationalContentIcon,
  ExpandIcon,
  GuideIcon,
  OptionCloseButton,
} from "@/assets/icons"
import { Modal } from "@/components/elements"
import styles from "./styles.module.css"
import { text } from "./text"

const MultiSelectOption = ({
  label,
  id,
  defaultValues,
  labelClassName,
  fieldClassName,
  containerClassName,
  fieldContainerClassName,
  optionsClassName,
  control,
  options,
  isError,
  guideContent,
  educationalContent,
}) => {
  const [isGuideOpen, setIsGuideOpen] = useState(false)
  const [isEducationalContentOpen, setIsEducationalContentOpen] =
    useState(false)
  const [selectedOptions, setSelectedOptions] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleSelectOption = (option) => {
    const isOptionSelected = selectedOptions.some(
      (o) => o.value === option.value
    )
    if (!isOptionSelected)
      return setSelectedOptions((prevState) => [...prevState, option])
    return setSelectedOptions((prevState) =>
      prevState.filter(
        (selectedOption) => option.value !== selectedOption.value
      )
    )
  }
  const returnSelectedOptions = (option) => {
    const isOptionSelected = selectedOptions.some(
      (o) => o.value === option.value
    )
    if (!isOptionSelected)
      return [...selectedOptions, option].map((option) => option.value)
    return selectedOptions
      .filter((selectedOption) => selectedOption !== option)
      .map((option) => option.value)
  }
  const handleRemoveOption = (optionValue) => {
    setSelectedOptions(selectedOptions.filter((o) => o.value !== optionValue))
  }
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    const values = options.filter((option) =>
      defaultValues?.includes(option.value)
    )
    setSelectedOptions(values)
  }, [defaultValues, options])

  return (
    <div className={classNames(styles.content, containerClassName)}>
      <div className={styles.questionContent}>
        <label
          className={classNames(styles.label, labelClassName)}
          htmlFor={id}
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

            <Modal
              isOpen={isGuideOpen}
              className=""
              onClose={() => setIsGuideOpen(false)}
            >
              <div>{guideContent}</div>
            </Modal>
          </div>
        )}
      </div>
      <div className={styles.posWrapper}>
        <div className={styles.pos} onClick={toggleDropdown}>
          <input
            type="text"
            className={classNames(styles.field, fieldClassName, {
              [styles.fieldError]: isError,
            })}
            placeholder={text.selectOneOrMore}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img className={styles.span} src={ExpandIcon} alt="expand Icon" />
        </div>
        {isDropdownOpen && (
          <div className={styles.dropDown}>
            {filteredOptions.map((option) => (
              <Controller
                control={control}
                key={option.value}
                name={id}
                render={({ field }) => (
                  <div
                    ref={null}
                    key={option.value}
                    id={id}
                    className={
                      selectedOptions
                        .map((option) => option.value)
                        .includes(option.value)
                        ? `${styles.dropDownTrue}`
                        : `${styles.dropDownFalse}`
                    }
                    onClick={() => {
                      field.onChange(returnSelectedOptions(option))
                      handleSelectOption(option)
                      toggleDropdown()
                    }}
                  >
                    {option.label}
                  </div>
                )}
              />
            ))}
          </div>
        )}
        {isDropdownOpen && (
          <div
            className={styles.dropDownOverlay}
            onClick={() => setIsDropdownOpen(false)}
          ></div>
        )}
      </div>
      <div
        className={classNames(
          styles.selectedOptionsContainer,
          fieldContainerClassName
        )}
      >
        {selectedOptions.map((option, index) => (
          <Controller
            control={control}
            name={id}
            key={`selected-option-${index}`}
            render={({ field }) => (
              <div
                ref={null}
                id={id}
                key={`selected-option-${index}`}
                className={classNames(styles.selectedOptions, optionsClassName)}
              >
                <div
                  onClick={() => {
                    field.onChange(returnSelectedOptions(option))
                    handleRemoveOption(option.value)
                  }}
                  className={styles.optionCloseBtn}
                >
                  <img src={OptionCloseButton} alt="close button" />
                </div>
                <span className={styles.optionLabel}>{option.label}</span>
              </div>
            )}
          />
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

export default MultiSelectOption
