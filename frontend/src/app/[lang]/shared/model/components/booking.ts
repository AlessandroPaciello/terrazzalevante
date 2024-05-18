import { StrapiButton } from "../strapi/links";
import { StrapiInput, StrapiRoom } from "../strapi/shared";

export interface BookingAboutProps {
    room: StrapiRoom
}

export interface BookingFormProps {
    inputs: StrapiInput[],
    submit: StrapiButton
}