import { ContactType } from "../enum/ContactType";

export type AddressModel = {
    id: number;
    addressType: ContactType;
    addressLine: string;
    location: string;
}