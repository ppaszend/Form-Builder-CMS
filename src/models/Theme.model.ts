export interface ThemeModel {
    _id: string;
    fields: {
        component: string;
        styles: object;
    }[];
    label: object;
    name: string;
    section: object;
}