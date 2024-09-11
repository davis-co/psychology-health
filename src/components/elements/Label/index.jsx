import React, { useState } from "react"
import styles from "./styles.module.css"
import classNames from "classnames"
import { createPortal } from "react-dom"
import { GuideIcon } from "@/assets/icons"
import Button from "../Button"
import Modal from "../Modal/new"

export default function Label({ title, required, isError, userGuide }) {
    const [openModal, setOM] = useState(false)
    return (
        <>
            <label
                className={classNames(styles.label, {
                    [styles.labelError]: isError,
                })}
                htmlFor={title}
            >
                {title + " "}
                {required ? <span className={styles.required}>*</span> : null}
                {userGuide ? (
                    <Button
                        icon={
                            <img src={GuideIcon} className={styles.guideIcon} />
                        }
                        className={styles.guideButton}
                        onClick={() => setOM(true)}
                    />
                ) : null}
            </label>

            {openModal
                ? createPortal(
                      <Modal onClose={() => setOM(false)}>{userGuide}</Modal>,
                      modal
                  )
                : null}
        </>
    )
}
