import { BaseDocument } from "./base.document";

export interface UserDocument extends BaseDocument {
    name: string;
    email: string;
    password: string;
}