import styles from './FormRow.module.scss';

interface FormRowProps {
    children: JSX.Element | JSX.Element[];
}

export default function FormRow(props: FormRowProps) {
    return (
        <div className={styles.FormRow}>
            {props.children}
        </div>
    )
}