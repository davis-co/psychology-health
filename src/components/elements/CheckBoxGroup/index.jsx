import classNames from 'classnames';
import { BiError } from 'react-icons/bi';

import { i18n } from '@/constants/i18n';
import useDevice from '@/hooks/useDevice';

import CheckBox from '../CheckBox';
import Divider from '../Divider';
import Label from '../Label';
import styles from './styles.module.css';

const CheckBoxGroup = ({
    containerClassName,
    optionsContainer,
    checkBoxClassName,
    options,
    label,
    wrap,
    divider,
    labelClassName,
    userGuide,
    errors,
    questionKey,
    required,
    setValue,
    watch,
}) => {
    const [device] = useDevice()
    const isError = !!errors[questionKey]
    const selectedValues = watch(questionKey) || []
    const handleCheckboxChange = (value) => {
        const newValue = selectedValues.includes(value)
            ? selectedValues.filter((v) => v !== value)
            : [...selectedValues, value]

        setValue(questionKey, newValue, { shouldValidate: true })
    }
    return (
        <div className={classNames(containerClassName, isError ? "field-error" : "", styles.container)}>
            <Label
                className={classNames(labelClassName, styles.label)}
                label={label}
                required={required}
                userGuide={userGuide}
            />
            {divider ? <Divider lassName={`mx-auto my-2 block w-1/2`} /> : null}
            {!divider && (wrap || device !== "desktop") ? (
                options?.map((o) => (
                    <CheckBox
                        key={o.value}
                        name={questionKey}
                        value={o.value}
                        label={o.label}
                        checked={selectedValues.includes(o.value)}
                        onChange={() => handleCheckboxChange(o.value)}
                        className={classNames(
                            styles.mobileCheckBox,
                            checkBoxClassName
                        )}
                    />
                ))
            ) : (
                <div className={classNames(optionsContainer, styles.options)}>
                    {options?.map((o) => (
                        <CheckBox
                            key={o.value}
                            name={questionKey}
                            value={o.value}
                            label={o.label}
                            checked={selectedValues.includes(o.value)}
                            onChange={() => handleCheckboxChange(o.value)}
                            className={checkBoxClassName}
                        />
                    ))}
                </div>
            )}
            {isError && required ? (
                <span className="text-error">
                    <BiError className="text-xs lg:text-base" />
                    {i18n("This is required.")}
                </span>
            ) : null}
        </div>
    )
}
export default CheckBoxGroup
