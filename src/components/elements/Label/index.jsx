import React, { useState } from 'react';
import { createPortal } from 'react-dom';

import classNames from 'classnames';

import { GuideIcon } from '@/assets/icons';
import {
  Button,
  Modal,
} from '@/components/elements';

import styles from './styles.module.css';

export default function Label({
    label,
    required,
    isError,
    userGuide,
    className,
}) {
    const [openModal, setOM] = useState(false)
    return (
        <>
            <label
                className={classNames(className, styles.label, {
                    [styles.labelError]: isError,
                })}
                htmlFor={label}
            >
                {label + " "}
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
