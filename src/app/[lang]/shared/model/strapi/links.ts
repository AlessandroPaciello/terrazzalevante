export type ButtonType = {
    text: string,
    type: ButtonTypeEnum
}

export enum ButtonTypeEnum {
    PRIMARY = "primary",
    SECONDARY = "secondary",
    IMAGE = "image",
}

export interface StrapiButton extends ButtonType {}