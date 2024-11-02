import { FaAngleLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

import Button from '../Button';
import styles from './styles.module.css';

export default function PN({ name, back = true }) {
  const navigate = back ? useNavigate() : null
  return (
    <div className={styles.container}>
      <div className="relative z-10 w-full">
        <div className="z-30 mx-auto flex items-center gap-1 lg:max-w-[1054px]">
          <span className={styles.rightLine}></span>
          <h1 className={styles.name}>{name}</h1>
          <span className={styles.leftLine}></span>
          {back ? (
            <Button
              style="text"
              title="بازگشت"
              className={"z-10 gap-1 bg-white px-1"}
              onClick={() => navigate(-1)}
              icon={<FaAngleLeft />}
            />
          ) : null}
        </div>
        <div className={styles.coverLine}></div>

      </div>
    </div>
  )
}
