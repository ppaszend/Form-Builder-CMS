import UserModel from "@/models/User.model";

export interface NewUser extends UserModel {
    password: string;
}