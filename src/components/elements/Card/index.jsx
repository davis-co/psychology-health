import styles from "./styles.module.css"
import { Link } from "react-router-dom"

const Card = ({ page }) => {
    return (
        <Link to={page.link} className={styles.container}>
            <img
                src={page.image}
                className={styles.cardIcon}
                alt={page.title}
                loading="lazy"
            />
            <h2>{page.title}</h2>
        </Link>
    )
}

export default Card
