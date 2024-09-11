import React from "react"
import styles from "./styles.module.css"
import classNames from "classnames"

const Table = ({ className, columns, rows, setValue }) => {
    return (
        <div className={classNames(styles.container, className)}>
            <table className={styles.content}>
                <thead className={styles.head}>
                    <tr>
                        {columns.map((colTitle, index) => (
                            <th
                                key={index}
                                scope="col"
                                className={`${styles.headContent} ${
                                    index === 0 ? styles.firstHead : ""
                                } ${
                                    index === columns.length - 1
                                        ? styles.lastHead
                                        : ""
                                }`}
                            >
                                {colTitle}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows?.length ?
                        rows?.map((row, i) => (
                            <tr key={"table-row" + i}>
                                {row?.map((_, j) => (
                                    <td
                                        key={"table-td" + j}
                                        className={styles.td}
                                    >
                                        {_}
                                    </td>
                                ))}
                            </tr>
                        )) : null}
                </tbody>
            </table>
        </div>
    )
}

export default Table
