import React, { useEffect, useState, useRef, useMemo, useCallback } from "react"
import styles from "./styles.module.css"
import CheckBox from "../CheckBox/new"
import classNames from "classnames"
import Button from "../Button"
import { MoreIconActive, MoreIconDisable } from "@/assets/icons"
import Modal from "../Modal/new"
import { createPortal } from "react-dom"
import TextField from "../TextField"
import { debounce } from "@/utils/helpers"
import Label from "../Label"

export default function Select({
    type,
    label,
    required,
    selectedOptions,
    multi,
    options,
    limit = window.innerWidth < 700 ? 5 : 15,
    modalLabel,
    showTextField = true,
    className,
    setValue,
    placeholder,
    isError,
    userGuide,
    ...props
}) {
    // collapse
    const [optionsToggle, setOptionsToggle] = useState(!showTextField)
    const container = useRef(0)
    const list = useRef(0)
    const [height, setHeight] = useState(list.current.offsetHeight)
    // data
    const [internalOptions, setIO] = useState([])
    const [initialSetterController, setISC] = useState(false)
    const [searchList, setSL] = useState([])
    const [handleUpdate, setHU] = useState(0)
    const [textFieldValue, setTFV] = useState("")
    // modal
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        if (optionsToggle) {
            setHeight(list.current.offsetHeight)
        } else {
            setHeight(0)
        }
    }, [optionsToggle])

    useEffect(() => {
        if (selectedOptions?.length) {
            setIO(
                options?.map((o) =>
                    Object({
                        ...o,
                        checked: selectedOptions.includes(o.value),
                    })
                )
            )
            // setISC(true)
        } else {
            setIO(
                options?.map((o) =>
                    Object({
                        ...o,
                        checked: false,
                    })
                )
            )
        }
    }, [selectedOptions, options, initialSetterController])

    const selectHandler = useCallback(
        (i) => {
            const options = internalOptions
            options[i].checked = !options[i].checked
            setIO(options)
            const checkedValues = options
                .filter((o) => o.checked)
                .map((o) => o.value)
            setValue(checkedValues)
            setHU(handleUpdate + 1)
        },
        [internalOptions, handleUpdate, handleUpdate, internalOptions, required]
    )

    const searchHandler = debounce(() => {
        if (textFieldValue?.length < 2) {
            setOptionsToggle(false)
            setSL([])
        } else {
            setHeight("auto")
            setOptionsToggle(true)
            setSL(
                internalOptions.filter((o) => o.label.includes(textFieldValue))
            )
        }
    }, 300)

    useEffect(() => {
        searchHandler()
    }, [textFieldValue])

    const checkActiveMoreIcon = internalOptions
        .slice(limit + 1, internalOptions?.length)
        .filter((o) => o.checked).length

    return (
        <>
            <div
                className={classNames(styles.container, className)}
                key={selectedOptions?.length}
            >
                <div className={styles.header}>
                    <Label
                        title={label}
                        required={required}
                        isError={isError}
                        userGuide={userGuide}
                    />
                    {options?.length > limit && !searchList?.length ? (
                        <Button
                            onClick={() => {
                                setOpenModal(true)
                            }}
                            title="مشاهده‌ی همه"
                            style="text"
                            className={styles.seeAll}
                        />
                    ) : null}
                </div>
                {multi ? (
                    <div className={styles.inputContainer}>
                        {showTextField ? (
                            <div
                                className={styles.selectedOptions}
                                onClick={() => setOptionsToggle(!optionsToggle)}
                            >
                                <TextField
                                    containerClassName={
                                        styles.textFieldContainer
                                    }
                                    className={styles.textField}
                                    placeholder={placeholder}
                                    onChange={(e) => setTFV(e.target.value)}
                                    value={textFieldValue}
                                    onClick={(e) => {
                                        setOptionsToggle(true)
                                        e.stopPropagation()
                                    }}
                                />
                                {internalOptions
                                    ?.filter((o) => o.checked)
                                    ?.map((iso, i) => (
                                        <div
                                            className={classNames(
                                                styles.selectedOption,
                                                internalOptions?.filter(
                                                    (o) => o.checked
                                                )?.length > 1
                                                    ? styles["flex-1-1-0"]
                                                    : ""
                                            )}
                                            key={iso?.label}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                selectHandler(
                                                    internalOptions.indexOf(iso)
                                                )
                                            }}
                                        >
                                            <Button
                                                style="outlined"
                                                className={styles.delete}
                                                title="&times;"
                                                onClick={() => {}}
                                            />
                                            <span>{iso?.label}</span>
                                        </div>
                                    ))}
                            </div>
                        ) : null}
                        <div
                            className={classNames(styles.optionsContainer)}
                            style={{
                                height: showTextField ? height : "auto",
                            }}
                            ref={container}
                        >
                            <ul className={styles.optionsList} ref={list}>
                                {textFieldValue?.length > 1 ? (
                                    searchList?.length ? (
                                        searchList?.map((_, i) => (
                                            <CheckBox
                                                checked={_.checked}
                                                label={_?.label}
                                                key={_?.label}
                                                onChange={() =>
                                                    selectHandler(
                                                        internalOptions.indexOf(
                                                            _
                                                        )
                                                    )
                                                }
                                            />
                                        ))
                                    ) : (
                                        <p
                                            className={styles.notFound}
                                        >{`موردی شما یافت نشد.`}</p>
                                    )
                                ) : (
                                    internalOptions
                                        ?.slice(0, limit)
                                        ?.map((_, i) => (
                                            <CheckBox
                                                checked={_.checked}
                                                label={_?.label}
                                                key={_?.label}
                                                onChange={() =>
                                                    selectHandler(i)
                                                }
                                            />
                                        ))
                                )}
                                {(textFieldValue?.length > 1
                                    ? searchList
                                    : internalOptions
                                )?.length > limit ? (
                                    <Button
                                        style="outlined"
                                        className={classNames(
                                            styles.moreButton,
                                            checkActiveMoreIcon
                                                ? styles.moreButtonActive
                                                : ""
                                        )}
                                        icon={
                                            <img
                                                src={
                                                    checkActiveMoreIcon
                                                        ? MoreIconActive
                                                        : MoreIconDisable
                                                }
                                                alt="burger"
                                                style={{
                                                    width: 18,
                                                    height: 18,
                                                }}
                                            />
                                        }
                                        onClick={() => {
                                            setOpenModal(!openModal)
                                        }}
                                    />
                                ) : null}
                            </ul>
                        </div>
                    </div>
                ) : null}
            </div>
            {openModal &&
                createPortal(
                    <Modal onClose={() => setOpenModal(false)}>
                        <div className={styles.modalBox}>
                            <div className={styles.modalOptions}>
                                <div className={styles.modalOptionsHeader}>
                                    <strong>
                                        {"همه‌ی" + " " + modalLabel}
                                    </strong>
                                    <span className={styles.modalLine}></span>
                                </div>
                                <ul className={styles.modalOptionsList}>
                                    {internalOptions?.map((o, i) => (
                                        <CheckBox
                                            checked={o.checked}
                                            onChange={() => selectHandler(i)}
                                            label={o?.label}
                                            key={o?.label}
                                        />
                                    ))}
                                </ul>
                            </div>
                            <div
                                className={
                                    styles.modalOptions + " " + "hidden lg:flex"
                                }
                            >
                                <div className={styles.modalOptionsHeader}>
                                    <strong>
                                        {modalLabel + "" + "ی انتخاب شده"}
                                    </strong>
                                    <span className={styles.modalLine}></span>
                                </div>
                                {selectedOptions?.length ? (
                                    <ul
                                        className={classNames(
                                            styles.modalOptionsList,
                                            styles.modalSelectedList
                                        )}
                                    >
                                        {internalOptions
                                            ?.filter((o) => o.checked)
                                            ?.map((_, i) => (
                                                <CheckBox
                                                    checked={_?.checked}
                                                    label={_?.label}
                                                    key={_?.label}
                                                    onChange={() =>
                                                        selectHandler(
                                                            internalOptions.indexOf(
                                                                _
                                                            )
                                                        )
                                                    }
                                                />
                                            ))}
                                    </ul>
                                ) : null}
                            </div>
                        </div>
                    </Modal>,
                    modal
                )}
        </>
    )
}
