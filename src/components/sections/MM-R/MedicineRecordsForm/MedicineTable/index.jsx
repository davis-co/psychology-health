import React, { useState } from "react"
import styles from "./styles.module.css"
import { Button, Pagination, Table } from "@/components/elements"
import { medicineTableColumns } from "../data"
import { i18n } from "../i18n"
import { addDrug, deleteDrug, extTableRows } from "./services"
import { tableSize } from "@/constants/form"

export default function MedicineTable({ tableData, setValue, watch }) {
    const [page, setPage] = useState(1)
    return (
        <div className={styles.container}>
            <Table
                columns={medicineTableColumns}
                rows={extTableRows(tableData)?.map((row, index) => [
                    ...row,
                    <Button
                        style="outlined"
                        title={i18n.delete}
                        className={styles.deleteButton}
                        onClick={() => deleteDrug(index, setValue, tableData)}
                    />,
                ])}
                setValue={setValue}
                className={styles.table}
            />
            <Pagination page={page} setPage={setPage} dataLength={extTableRows(tableData)?.length} />
        </div>
    )
}
