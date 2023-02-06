import styles from './FieldWrapper.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGripVertical, faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {getSectionByPosition} from "@/helpers/getters";
// import {useAppSelector} from "@/app/hooks";
// import {selectForm} from "@/stores/form";

interface FieldWrapperProps {
    label: string;
    for: string;
    editable: boolean;
    onEdit: () => void;
    children: JSX.Element | JSX.Element[];
    position: [number, number, number, number];
}

export default function FieldWrapper(props: FieldWrapperProps) {
    // const form = useAppSelector(selectForm);
    const form = null;

    const onRemoveHandler = () => {
        if (form) {
            console.log(getSectionByPosition(form, props.position));
        }
    }

    return (
        <div className={styles.fieldWrapper}>
            {props.editable &&
                <button className={styles.dragZone}>
                    <FontAwesomeIcon icon={faGripVertical} />
                </button>
            }

            <div className={styles.fieldWrapperContent}>
                <div className={styles.fieldWrapperHeader}>
                    <label htmlFor={props.for}
                           contentEditable={props.editable}
                    >
                        {props.label}
                    </label>

                    {props.editable && <>
                        <button className={styles.fieldWrapperButton}
                                onClick={props.onEdit}
                        >
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </button>

                        <button className={styles.fieldWrapperButton}
                                onClick={onRemoveHandler}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </>}
                </div>

                <div className={styles.fieldWrapperContent}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}