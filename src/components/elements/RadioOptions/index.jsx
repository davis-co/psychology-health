// import {
//   useEffect,
//   useState,
// } from 'react';

// import classNames from 'classnames';

// import {
//   Divider,
//   Label,
//   Radio,
// } from '@/components/elements';

// import styles from './styles.module.css';

// export default function RadioOptions({
//     className,
//     register,
//     options,
//     active,
//     divider,
//     isError,
//     label,
//     questionKey,
//     labelClassName,
//     required,
//     wrap = false,
// }) {
//     const [device, setDevice] = useState("mobile")
//     const checkDevice = () => {
//         const width = window.innerWidth
//         if (width < 620) {
//             setDevice("mobile")
//         } else if (width >= 620 && width < 1024) {
//             setDevice("tablet")
//         } else {
//             setDevice("desktop")
//         }
//     }
//     useEffect(() => {
//         checkDevice()
//         window.addEventListener("resize", () => {
//             checkDevice()
//         })
//     }, [])

//     const labelClasses = labelClassName
//     ? labelClassName
//     : options.length == 2
//     ? "!w-[40%] lg:!w-[60%]"
//     : "lg:!max-w-fit lg:!min-w-fit"

//     return (
//         <div
//             className={classNames(
//                 "form-item",
//                 className,
//                 styles.container,
//                 wrap || device !== "desktop" ? "" : "!flex-nowrap"
//             )}
//         >
//             <Label
//                 className={labelClasses}
//                 title={label}
//                 required={required}
//                 isError={isError}
                
//             />
//             {divider ? (
//                 <Divider className={`mx-auto my-3 block w-1/2 lg:hidden`} />
//             ) : null}
//             {wrap || device !== "desktop" ? (
//                 options?.map((o) => (
//                     <Radio
//                         className={styles.mobileRadio}
//                         checked={active === o.value}
//                         value={o.value}
//                         label={o.label}
//                         key={o.label}
//                         {...register(questionKey, {
//                             required: required,
//                         })}
//                     />
//                 ))
//             ) : (
//                 <div
//                     className={classNames(
//                         options.length == 2
//                             ? "lg:max-w-fit !gap-6 lg:!gap-6"
//                             : "",
//                         styles.options,
//                         "hidden lg:flex"
//                     )}
//                 >
//                     {options?.map((o) => (
//                         <Radio
//                             checked={active === o.value}
//                             value={o.value}
//                             label={o.label}
//                             key={o.label}
//                             {...register(questionKey, {
//                                 required: true,
//                             })}
//                         />
//                     ))}
//                 </div>
//             )}
//         </div>
//     )
// }

import {
  useEffect,
  useState,
} from 'react';

import classNames from 'classnames';

import {
  Divider,
  Label,
  Radio,
} from '@/components/elements';

import styles from './styles.module.css';

export default function RadioOptions({
    className,
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
    required,
    labelClassName,
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
    const labelClasses = labelClassName
        ? labelClassName
        : options.length == 2
        ? "!w-[40%] lg:!w-[50%]"
        : "lg:!max-w-fit lg:!min-w-fit"

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
                className={classNames(labelClasses, styles.label)}
                userGuide={userGuide}
                label={label}
                required={required}
                isError={isError}
            />
            {divider ? (
                <Divider className={`mx-auto my-3 block w-1/2 lg:hidden`} />
            ) : null}
            {wrap || device !== "desktop" ? (
                options?.map((o) => (
                    <Radio
                        className={styles.mobileRadio}
                        checked={active === o.value}
                        value={o.value}
                        label={o.label}
                        key={o.label}
                        onClick={onClick}
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
                            onClick={onClick}
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