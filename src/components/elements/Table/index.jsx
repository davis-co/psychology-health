import classNames from "classnames"
import { IoPrintOutline } from "react-icons/io5"
import { i18n } from "@/constants/i18n"
import Button from "../Button"
import styles from "./styles.module.scss"
// import { printArea } from "@/utils/helpers"
import Dropdown from "../Dropdown"

const Table = ({
    className,
    containerClassName,
    columns,
    rows,
    pagination,
    currentPage,
    setPage,
    tableSize,
    setTableSize,
    selectable,
    stripe,
    tableSizes,
}) => {
    return rows?.length ? (
        <div className={classNames(styles.container, containerClassName)}>
            <div className="w-full overflow-x-auto">
                <table
                    className={classNames(
                        styles.table,
                        className,
                        selectable ? styles.selectable : "",
                        stripe ? styles.stripe : ""
                    )}
                >
                    <thead className={styles.thead}>
                        <tr className={styles.tr}>
                            {columns.map((colTitle, index) => (
                                <th
                                    key={index}
                                    scope="col"
                                    className={styles.th}
                                >
                                    {colTitle}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className={styles.tbody}>
                        {rows?.map((row, i) => (
                            <tr
                                className={classNames(styles.tr, "group")}
                                key={"table-row" + i}
                            >
                                {row?.map((_, j) => (
                                    <td
                                        key={"table-td" + j}
                                        className={styles.td}
                                    >
                                        {_}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {pagination ? (
                <div className={styles.pagination}>
                    <div className={styles["dynamic-options"]}></div>
                    <div className={styles["default-options"]}>
                        <Button
                            className={styles.next}
                            style={""}
                            onClick={() =>
                                // printArea(
                                //     document.querySelector(
                                //         `.${styles.container}`
                                //     )
                                // )
                                window.print()
                            }
                            icon={
                                <IoPrintOutline className="cursor-pointer bg-white !text-xl" />
                            }
                        />
                        {tableSizes ? (
                            <Dropdown
                                label={"نمایش به صورت :"}
                                value={tableSize}
                                options={tableSizes}
                                onChange={(val) => setTableSize(val)}
                            />
                        ) : null}
                        <Button
                            className={styles.next}
                            style={currentPage == 1 ? "disabled" : ""}
                            title={i18n("Prev")}
                            onClick={() =>
                                setPage(Math.max(currentPage - 1, 1))
                            }
                        />
                        <div className={styles["current-page"]}>
                            {currentPage}
                        </div>
                        <Button
                            className={styles.next}
                            title={i18n("Next")}
                            style={
                                Math.floor(rows?.length / tableSize) == 0
                                    ? "disabled"
                                    : ""
                            }
                            onClick={() => setPage(currentPage + 1)}
                        />
                    </div>
                </div>
            ) : null}
        </div>
    ) : null
}

export default Table
