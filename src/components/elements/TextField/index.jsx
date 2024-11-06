import { useState } from 'react';

import classNames from 'classnames';
import { BiError } from 'react-icons/bi';
import { BsPencilSquare } from 'react-icons/bs';

import { i18n } from '@/constants/i18n';

import Divider from '../Divider';
import Label from '../Label';
import styles from './styles.module.scss';

const TextField = ({
    containerClassName,
    className,
    label,
    icon,
    userGuide,
    archive,
    divider,
    labelClassName,
    questionKey,
    required,
    register,
    watch,
    errors,
    pattern,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false)
    const disabled = props.disabled
    const isError = !!errors[questionKey]
    const inputMode = props?.type == "number" ? "numeric" : ""
    return (
        <div
            className={classNames(
                isError ? "field-error" : "",
                styles.container,
                containerClassName
            )}
        >
            {label ? (
                <Label
                    className={labelClassName}
                    userGuide={userGuide}
                    archive={archive ? questionKey : false}
                    label={label}
                    required={required}
                />
            ) : null}
                {divider? <Divider/> : null}

            <div
                className={classNames(
                    isFocused
                        ? "border-green !bg-white"
                        : "hover:border-green border-black",
                    className,
                    "group",
                    styles.field,
                    disabled ? styles.disabled : null
                )}
            >
                {props.rows > 1 ? (
                    <textarea
                        className={styles.input}
                        {...register(questionKey, {
                            required: required
                                ? i18n("This is required.")
                                : false,
                            pattern: pattern,
                        })}
                        {...props}
                        value={watch(questionKey) || ""}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                ) : (
                    <>
                        <input
                            className={styles.input}
                            {...register(questionKey, {
                                required: required
                                    ? i18n("This is required.")
                                    : false,
                                pattern: pattern,
                            })}
                            value={watch(questionKey) || ""}
                            inputMode={inputMode}
                            {...props}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                    </>
                )}
                {props.rows > 1 ? (
                    icon ? (
                        <img className={styles.icon} src={icon} />
                    ) : null
                ) : icon ? (
                    icon
                ) : (
                    <BsPencilSquare
                        className={classNames(
                            styles.icon,
                            isFocused ? "text-green" : "text-gray-500",
                            "group-hover:text-green"
                        )}
                    />
                )}
            </div>
            {isError ? (
                <span className="text-error">
                    <BiError className="text-xs lg:text-base" />
                    {errors[questionKey]?.message}
                </span>
            ) : null}
        </div>
    )
}

export default TextField
