// import { createPortal } from 'react-dom';

// import classNames from 'classnames';

// import { CloseButtonIcon } from '@/assets/icons';

// import styles from './styles.module.css';

// const Modal = ({ isOpen, onClose, children, className, ...rest }) => {
//   const handleClickOutside = (event) => {
//     if (event.target === event.currentTarget) {
//       onClose()
//     }
//   }

//   if (!isOpen) return null

//   return createPortal(
//     <div className={styles.modalOverlay} onClick={handleClickOutside} {...rest}>
//       <div className={classNames(styles.modal, className)}>
//         <div className={styles.modalHeader}>
//           <Button
//             style="outlined"
//             className={styles.closeButton}
//             icon={
//               <img
//                 className={styles.closeIcon}
//                 src={CloseButtonIcon}
//                 alt="closeButton"
//               />
//             }
//             onClick={() => {
//               onClose()
//             }}
//           />
//         </div>
//         <div className={styles.modalContent}>{children}</div>
//       </div>
//     </div>,
//     modal
//   )
// }

// export default Modal

import { createPortal } from 'react-dom';

import Button from '../Button';
import styles from './styles.module.css';

const Modal = ({ onClose, children }) => {
  console.log("hiiiiiiiiiiiii");
  
    return createPortal(
        <div className={styles.container} onClick={() => onClose()}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <Button
                    style="outlined"
                    className={styles.closeButton}
                    title="&times;"
                    onClick={() => {
                        onClose()
                    }}
                />
                {children}
            </div>
        </div>,
        // eslint-disable-next-line no-undef
        modal
    )
}

export default Modal
