import {StepModel} from "@/models/Step.model";
import {ThemeModel} from "@/models/Theme.model";

export interface FormModel {
    _id: string;
    name: string;
    theme: ThemeModel;
    steps: StepModel[];
}