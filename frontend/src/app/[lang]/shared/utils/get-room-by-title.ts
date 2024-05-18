import { fetchAPI } from "./fetch-api";

export async function getRoomByTitle(slug: string, lang: string) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    const path = `/rooms`;
    const urlParamsObject = {filters: {slug}, locale: lang};
    const options = {headers: {Authorization: `Bearer ${token}`}};
    return await fetchAPI(path, urlParamsObject, options);
}