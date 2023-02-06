import {RowModel} from "@/models/Row.model";

export interface SectionModel {
    id: number;
    props: {
        title?: string;
    };
    rows: RowModel[];
}