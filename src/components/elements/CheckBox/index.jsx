import classNames from 'classnames';

import styles from './styles.module.css';

const CheckBox = ({
    name,
    value,
    label,
    checked,
    onChange,
    disabled,
    className,
}) => (
    <label
        className={classNames(
            className,
            styles.container,
            checked ? styles.checkedContainer : null,
            disabled ? styles.disabledContainer : null
        )}
    >
        <span className={styles.label}>{label}</span>
        <div
            className={classNames(
                styles.secondLayer,
                checked ? styles.secondLayerChecked : ""
            )}
        >
            <div
                className={classNames(
                    styles.firstLayer,
                    checked ? styles.firstLayerChecked : ""
                )}
            >
                <input
                    className={styles.input}
                    type="checkbox"
                    value={value}
                    name={name}
                    onChange={onChange}
                    checked={checked}
                />
            </div>
        </div>
    </label>
)

CheckBox.displayName = "CheckBox"

export default CheckBox
