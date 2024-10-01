import { Divider, Label, Radio } from "@/components/elements"
import classNames from "classnames"
import styles from "./styles.module.css"
import { useEffect, useState } from "react"

export default function RadioOptions({
    className,
    register,
    options,
    active,
    divider,
    isError,
    label,
    questionKey,
    required,
    wrap = false,
}) {
    const [device, setDevice] = useState("mobile")
    const checkDevice = () => {
        const width = window.innerWidth
        if (width < 620) {
            setDevice("mobile")
        } else if (width >= 620 && width < 1024) {
            setDevice("tablet")
        } else {
            setDevice("desktop")
        }
    }
    useEffect(() => {
        checkDevice()
        window.addEventListener("resize", () => {
            checkDevice()
        })
    }, [])
    return (
        <div
            className={classNames(
                "form-item",
                className,
                styles.container,
                wrap || device !== "desktop" ? "" : "!flex-nowrap"
            )}
        >
            <Label
                className={classNames(
                    options.length == 2 ? "!w-[40%] lg:!w-[40%]" : "",
                    styles.label
                )}
                title={label}
                required={required}
                isError={isError}
                
            />
            {divider ? (
                <Divider className={`block w-1/2 mx-auto my-3 lg:hidden `} />
            ) : null}
            {wrap || device !== "desktop" ? (
                options?.map((o) => (
                    <Radio
                        className={styles.mobileRadio}
                        checked={active === o.value}
                        value={o.value}
                        label={o.label}
                        key={o.label}
                        {...register(questionKey, {
                            required: required,
                        })}
                    />
                ))
            ) : (
                <div
                    className={classNames(
                        options.length == 2
                            ? "lg:max-w-fit !gap-6 lg:!gap-6"
                            : "",
                        styles.options,
                        "hidden lg:flex"
                    )}
                >
                    {options?.map((o) => (
                        <Radio
                            checked={active === o.value}
                            value={o.value}
                            label={o.label}
                            key={o.label}
                            {...register(questionKey, {
                                required: true,
                            })}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
