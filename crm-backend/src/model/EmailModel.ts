import { ContactType } from "../enum/ContactType";

export type EmailModel = {
    id: number;
    emailType: ContactType;
    emailAddress: string;
}