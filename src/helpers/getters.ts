import {FormModel} from "@/models/Form.model";
import {StepModel} from "@/models/Step.model";
import {SectionModel} from "@/models/Section.model";
import {RowModel} from "@/models/Row.model";
import {FieldModel} from "@/models/Field.model";

export const getStepByPosition = (
    form: FormModel,
    position: [number, number?, number?, number?]
): StepModel | undefined => {
    return form.steps.find((step) => step.id === position[0]);
};

export const getSectionByPosition = (
    form: FormModel,
    position: [number, number, number?, number?]
): SectionModel | undefined => {
    return getStepByPosition(form, position)?.sections.find(
        (section) => section.id === position[1]
    );
};

export const getRowByPosition = (
    form: FormModel,
    position: [number, number, number, number?]
): RowModel | undefined => {
    return getSectionByPosition(form, position)?.rows.find(
        (row) => row.id === position[2]
    );
};

export const getFieldByPosition = (
    form: FormModel,
    position: [number, number, number, number]
): FieldModel | undefined => {
    return getRowByPosition(form, position)?.fields.find(
        (field) => field.id === position[3]
    );
};
