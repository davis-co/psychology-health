import { useState } from "react"

import classNames from "classnames"
import { FaRegQuestionCircle } from "react-icons/fa"
import { LiaArchiveSolid } from "react-icons/lia"

// import ArchiveTable from "@/components/layouts/ArchiveTable"

import Modal from "../Modal"
import styles from "./styles.module.css"

export default function Label({
    label,
    required,
    className,
    userGuide,
    archive,
}) {
    const [openUserGuide, setOpenUserGuide] = useState(false)
    const [openArchives, setOpenArchive] = useState(false)
    return (
        <label className={classNames(className, styles.label)}>
            {label}
            {required ? <span className={styles.required}>*</span> : null}
            {userGuide ? (
                <FaRegQuestionCircle
                    className="ml-0.5 mr-1 inline min-h-[12px] min-w-[12px] cursor-pointer text-black transition-all hover:text-green md:min-h-[14px] md:min-w-[14px] lg:min-h-[18px] lg:min-w-[18px]"
                    onClick={() => setOpenUserGuide(true)}
                    title="راهنما"
                    color
                />
            ) : null}
            {/* {archive ? (
                <LiaArchiveSolid
                    className="mx-0.5 inline min-h-[15px] min-w-[15px] cursor-pointer text-black transition-all hover:text-green md:min-h-[18px] md:min-w-[18px] lg:min-h-[22px] lg:min-w-[22px]"
                    onClick={() => setOpenArchive(true)}
                    strokeWidth={0.4}
                    title="آرشیو"
                />
            ) : null} */}
            <Modal
                isOpen={openUserGuide || openArchives}
                onClose={() => {
                    setOpenUserGuide(false)
                    setOpenArchive(false)
                }}
                containerClassName={
                    "bg-white-lighter rounded-3xl px-3 pt-3 pb-6 lg:px-6 lg:pt-4 lg:pb-8"
                }
            >
                {openUserGuide ? userGuide : null}
                {openArchives ? <ArchiveTable questionKey={archive} /> : null}
            </Modal>
        </label>
    )
}
