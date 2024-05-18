
import LangRedirect from "../components/LangRedirect"
import { fetchAPI } from "../shared/utils/fetch-api";
import { getPageBySlug } from "../shared/utils/get-page-by-slug"
import { sectionRenderer } from "../shared/utils/section-renderer"

type Props = {
  params: {
    lang: string,
    rooms: string
  }
}

export default async function PageRoute({ params }: Props) {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    // const path = `/pages`;
    // const urlParamsObject = { filters: { slug: params.rooms }, locale: params.lang };
    // const options = { headers: { Authorization: `Bearer ${token}` } };
    // const page = await fetchAPI(path, urlParamsObject, options);
    const page = await getPageBySlug(params.rooms, params.lang)
    if (page.error && page.error.status == 401) {
      throw new Error(
        'Missing or invalid credentials. Have you created an access token using the Strapi admin panel? http://localhost:1337/admin/'
      )
    }

    if (page.data.length === 0) return null
    const contentSections = page.data[0].attributes.contentSections

    return contentSections.map((section: any, index: number) =>
      sectionRenderer(section, index)
    )

  } catch (error: any) {
    window.alert('Missing or invalid credentials')
  }
}