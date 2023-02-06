interface fieldStyles {
    borderRadius: string;
}

interface fieldProps {
    name: string;
    label: string;
    type?: string;
    defaultValue?: string;
}

export interface FieldModel {
    id: number;
    component: string;
    cols: number;
    props: fieldProps;
    styles: fieldStyles;
}
