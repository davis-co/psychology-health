import { useNavigate } from 'react-router-dom';

import Button from '../Button';
import styles from './styles.module.css';

export default function PN({ name, back = true }) {
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <span className={styles.rightLine}></span>
      <h1 className={styles.name}>{name}</h1>
      <span className={styles.leftLine}></span>
      {back ? (
        <Button
          style="text"
          title="بازگشت"
          onClick={() => navigate(-1)}
          className="cursor-pointer text-xs hover:text-gray-500 lg:text-md"
        />
      ) : null}
    </div>
  )
}
