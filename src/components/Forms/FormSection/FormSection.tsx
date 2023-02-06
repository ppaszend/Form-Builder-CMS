import styles from './FormSection.module.scss';

interface FormSectionProps {
    title?: string;
    styles?: {
        section: object;
        title: object;
        body: object;
    };
    children: JSX.Element | JSX.Element[];
}

export default function FormSection(props: FormSectionProps) {
    return (
        <div className={styles.FormSection}
             style={props.styles?.section}
        >
            {props.title && (
                <div className={styles.formSection__title}
                     style={props.styles?.title}
                >
                    {props.title}
                </div>
            )}

            <div className={styles.formSection__Body}
                 style={props.styles?.body}
            >
                {props.children}
            </div>
        </div>
    )
}
