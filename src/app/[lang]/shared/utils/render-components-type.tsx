import { RenderInputData, RenderInputSelect, RenderInputText } from "../components/render/input";
import { InputType, StrapiInput } from "../model/strapi/shared";

/**
 * questo metodo renderizza il tipo di input
 * @param input dto di strapi
 * @returns il componente input in base al type
 */
export function RenderInputType(input: StrapiInput) {
    const { type } = input
    switch (type) {
        case InputType.DATE:
            return <RenderInputData input={input}/>
        case InputType.TEXT:
            return <RenderInputText input={input}/>
        case InputType.SELECT:
            return <RenderInputSelect input={input}/>
        default:
            throw Error(`Input type ${type} not supported`)
    }
}
