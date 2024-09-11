import ErrorPageSVG from "@/assets/images/error.svg"

import styles from "./styles.module.css"
import { i18n } from "./i18n"

const NotFound = ({ statusCode, message }) => {
  return (
    <div className={styles.content}>
      <img src={ErrorPageSVG} alt="Not Found!" />
      <h1 className={styles.header}>{`${i18n.staticErrorTitle}`}</h1>
      <p className={styles.description}>{`${i18n.staticErrorMessage}`}</p>
      {statusCode && <h2 className={styles.header}>{statusCode}</h2>}
      {message && <p className={styles.description}>{message}</p>}
    </div>
  )
}

export default NotFound
