import styles from './TextField.module.scss';
import FieldWrapper from "@/components/Forms/Fields/FieldWrapper/fieldWrapper";

interface TextFieldProps {
    id: string;
    editable?: boolean;
    label?: string;
    type?: string;
    disabled?: boolean;
    readOnly?: boolean;
    styles?: {
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: string;
        fontSize?: string;
        inputHeight?: string;
    };
    position: [number, number, number, number];
}

export default function TextField(props: TextFieldProps) {
    return (
        <FieldWrapper
            label={props.label || ''}
            for={props.id}
            editable={props.editable || false}
            onEdit={() => {}}
            position={props.position}
        >
            <input
                id={props.id}
                className={styles.formInput}
                type={props.type || 'text'}
                disabled={props.disabled || false}
                readOnly={props.readOnly || false}
                style={props.styles}
            />
        </FieldWrapper>
    )
}
