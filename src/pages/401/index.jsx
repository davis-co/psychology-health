import UnAuthPageSVG from "@/assets/images/unauthorized.svg"
import styles from "./styles.module.css"
import { i18n } from "./i18n"

const Unauthorized = ({ statusCode, message }) => {
  return (
    <div className={styles.content}>
      <img src={UnAuthPageSVG} alt="Inaccessibility!" />
      <h1 className={styles.header}>{`${i18n.staticErrorTitle}`}</h1>
      <p className={styles.description}>{`${i18n.staticErrorMessage}`}</p>
      {statusCode && <h2 className={styles.header}>{statusCode}</h2>}
      {message && <p className={styles.description}>{message}</p>}
    </div>
  )
}

export default Unauthorized
