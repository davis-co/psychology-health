import React from 'react';

import classNames from 'classnames';

import {
  Label,
  Radio,
} from '@/components/elements';

import styles from './styles.module.css';

export default function BooleanFormField({
    className,
    label,
    required,
    options,
    isError,
    value,
    ...props
}) {
    return (
        <label className={classNames(styles.formItem, className)}>
            <Label label={label} required={required} isError={isError} />
            <div
                className={classNames(styles.radios, {
                    [styles.error]: isError,
                })}
            >
                {options?.map((_, i) => (
                    <Radio
                        checked={_.value === value}
                        value={_.value}
                        label={_.label}
                        key={_.label + i}
                        {...props}
                    />
                ))}
            </div>
        </label>
    )
}
