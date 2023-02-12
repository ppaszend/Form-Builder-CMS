import {NewUser} from "@/models/NewUser";

export interface RegisterForm extends NewUser {
    repeatPassword: string;
}