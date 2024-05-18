import { Data, Picture } from "../../utils/model";
import { StrapiAbout } from "./elements";
import { StrapiButton } from "./links";

export type Input = {
    placeholder: string;
    label: string;
    extend: boolean | 'true' | 'false';
    type: InputType;
    options?: OptionsType[]
};

export enum InputType {
    DATE = "date",
    TEXT = "text",
    SELECT = "select",
}

export type OptionsType = {
    label: string;
    value: string
}

export type Room = {
    id: number;
    attributes: {
        description: string;
        about: StrapiAbout[];
        services: StrapiAbout[];
        title: string;
        image: {
            data: Data
        },
        gallery: {
            data: Picture[]
        }
    }
}
export type Allert = {
    id: number;
    label: string;
    close: string;
    show: boolean;
}

export interface StrapiAllert extends Allert {}

export interface StrapiRoom extends Room {}

export interface StrapiInput extends Input {}