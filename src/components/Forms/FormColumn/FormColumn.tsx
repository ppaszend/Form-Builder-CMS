import styles from './FormColumn.module.scss';

interface FormColumnProps {
    columns: number;
    children: JSX.Element | JSX.Element[];
}

export default function FormColumn(props: FormColumnProps) {
    const columnWidth: string = `${(100 / 12) * props.columns}%`;

    return (
        <div className={styles.formColumn} style={{width: columnWidth}}>
            {props.children}
        </div>
    )
}
