import styles from "./styles.module.css"

const Spinner = ({size = 50, color = 'rgb(100, 77, 246)'}) => {
    return (
        <div className={styles.container}>
            <div
                className={styles.spinner}
                style={{
                    minWidth: size,
                    minHeight: size,
                    borderColor : color
                }}
            ></div>
        </div>
    )
}


export default Spinner
