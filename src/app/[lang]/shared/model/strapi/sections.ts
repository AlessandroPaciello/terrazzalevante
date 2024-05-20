import { StrapiButton } from "./links";
import { StrapiAllert, StrapiInput, StrapiRoom } from "./shared";

export type Booking = {
    data: {
        id: number;
        rooms: {
            data: StrapiRoom[]
        }
        inputs: StrapiInput[];
        title: string;
        subText: string;
        submit: StrapiButton;
        success: StrapiAllert;
    }
}

export interface StrapiBooking extends Booking {}