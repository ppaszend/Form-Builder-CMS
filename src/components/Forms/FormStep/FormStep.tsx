import styles from './FormStep.module.scss';

interface FormStepProps {
    children: JSX.Element | JSX.Element[];
}

export default function FormStep(props: FormStepProps) {
    return (
        <div className={styles.FormStep}>
            {props.children}
        </div>
    )
}