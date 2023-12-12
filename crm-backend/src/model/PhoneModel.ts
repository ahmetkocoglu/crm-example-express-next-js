import { ContactType } from "../enum/ContactType";

export type PhoneModel = {
    id: number;
    phoneType: ContactType;
    phoneNumber: string;
}