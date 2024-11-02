import classNames from 'classnames';
import { BiError } from 'react-icons/bi';
import { IoIosInformationCircle } from 'react-icons/io';

import {
  Divider,
  Label,
  Radio,
} from '@/components/elements';
import { i18n } from '@/constants/i18n';
import useDevice from '@/hooks/useDevice';

import styles from './styles.module.css';

export default function RadioOptions({
    containerClassName,
    register,
    options,
    active,
    divider,
    isError,
    label,
    onClick,
    userGuide,
    questionKey,
    wrap = false,
    labelClassName,
    optionsContainer,
    radioClassName,
    required,
    educationalContent,
}) {
    const [device] = useDevice()
    const labelClasses = labelClassName
        ? labelClassName
        : classNames(
              options.length == 2 ? "!w-[40%] lg:!w-[40%]" : "",
              styles.label
          )
    return (
        <div
            className={classNames(
                containerClassName,
                styles.container,
                wrap || device !== "desktop" ? "" : "!flex-nowrap",
                isError ? "field-error" : "",
                educationalContent?.show ? "!pl-6 md:!pl-7 lg:!pl-8" : ""
            )}
        >
            <Label
                className={classNames(labelClasses, divider ? "!inline" : "")}
                userGuide={userGuide}
                label={label}
                required={required}
            />
            {divider ? (
                <Divider className={`mx-auto my-2 block w-full`} />
            ) : null}
            {!divider && (wrap || device !== "desktop") ? (
                options?.map((o) => (
                    <Radio
                        className={classNames(
                            radioClassName,
                            styles.mobileRadio
                        )}
                        checked={active === o.value}
                        value={o.value}
                        label={o.label}
                        key={o.label}
                        onClick={onClick}
                        {...register(questionKey, {
                            required,
                        })}
                    />
                ))
            ) : (
                <div
                    className={classNames(
                        optionsContainer,
                        options.length == 2 ? "lg:max-w-fit" : "",
                        styles.options
                    )}
                >
                    {options?.map((o) => (
                        <Radio
                            checked={active === o.value}
                            value={o.value}
                            className={radioClassName}
                            label={o.label}
                            key={o.label}
                            onClick={onClick}
                            {...register(questionKey, {
                                required,
                            })}
                        />
                    ))}
                </div>
            )}
            {educationalContent?.show ? (
                <IoIosInformationCircle
                    className="educational-content-icon"
                    onClick={() => educationalContent.action()}
                />
            ) : null}
            {isError && required ? (
                <span className="text-error">
                    <BiError className="text-xs lg:text-base" />
                    {i18n("This is required.")}
                </span>
            ) : null}
        </div>
    )
}
