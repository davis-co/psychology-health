import classNames from "classnames"
import styles from "./styles.module.scss"

const FieldSet = ({ title, children, className }) => {
    return (
        <fieldset className={classNames(className, styles.fieldset)}>
            <legend className={styles.legend}>{title}</legend>
            {children}
        </fieldset>
    )
}
FieldSet.displayName = "FieldSet"

export default FieldSet
