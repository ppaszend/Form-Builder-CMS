import {FieldModel} from "@/models/Field.model";

export interface RowModel {
    id: number;
    fields: FieldModel[];
}