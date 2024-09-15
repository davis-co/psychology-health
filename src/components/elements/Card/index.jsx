import { LeftIcon } from "@/assets/icons"

import styles from "./styles.module.css"

const Card = ({ page, setPage }) => {
    return (
        <div className={styles.container} onClick={() => setPage(page.name)}>
            <img src={page.image} className={styles.cardIcon} alt={page.title} loading="lazy" />
            <div className={styles.content}>
                <h2>{page.title}</h2>
                <img src={LeftIcon} alt="جهت" />
            </div>
        </div>
    )
}

export default Card
