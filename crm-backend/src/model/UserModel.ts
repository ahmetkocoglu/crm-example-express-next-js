import { BaseUserModel } from "./BaseUserModel";

export interface UserModel extends BaseUserModel {
    role: string;
    confirmed: string;
    createdAt: Date;
}