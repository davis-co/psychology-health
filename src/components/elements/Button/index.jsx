import { Spinner } from "@/components/elements"
import classNames from "classnames"
import styles from "./styles.module.css"

const Button = ({
    title,
    className,
    loading,
    style,
    type = "button",
    icon,
    ...props
}) => {
    const loadingColor = {
        variant: "white",
        outlined: "black",
        disabled: "#7E7E7E",
        text: "black",
    }

    const iconStyle = icon ? (title ? "" : styles.icon) : ""
    return (
        <button
            className={classNames(
                styles.button,
                styles[style],
                iconStyle,
                className
            )}
            title={title}
            type={type}
            disabled={style === "disabled"}
            {...props}
        >
            {loading ? (
                <Spinner color={loadingColor[style]} size={18} />
            ) : (
                <>
                    {icon}
                    {title}
                </>
            )}
        </button>
    )
}

export default Button
