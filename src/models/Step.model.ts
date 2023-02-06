import {SectionModel} from "@/models/Section.model";

export interface StepModel {
    id: number;
    sections: SectionModel[];
}