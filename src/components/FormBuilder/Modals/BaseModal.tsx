import styles from './BaseModal.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

interface BaseModalProps {
    visibility: boolean;
    visibilityHandler: (visibility: boolean) => void;
    title?: string;
    children?: JSX.Element | JSX.Element[];
}

export default function BaseModal(props: BaseModalProps) {
    return (props.visibility && (
        <div className={styles.modalWrapper}
             onClick={() => props.visibilityHandler(false)}
        >
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    {props.title && (<div className={styles.modalTitle}>{props.title}</div>)}

                    <div className={styles.modalButtons}>
                        <button className={styles.modalButton}
                                onClick={() => props.visibilityHandler(false)}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                </div>

                <div className={styles.modalContent}>
                    {props.children}
                </div>
            </div>
        </div>)
    )
}
