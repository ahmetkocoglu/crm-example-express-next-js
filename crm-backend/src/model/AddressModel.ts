import { ContactType } from "../enum/ContactEnum";

export type AddressModel = {
    id: number;
    addressType: ContactType;
    addressLine: string;
    location: string;
}