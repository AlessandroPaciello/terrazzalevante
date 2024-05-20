import { getPageBySlug, getRoomBySlug } from "../../shared/utils/get-page-by-slug";
import { sectionRenderer } from "../../shared/utils/section-renderer";
import Room from '../../views/room';

type Props = {
    params: {
      lang: string,
      room: string
    }
  }

export default async function PageRoute({ params }: Props) {
    try {
        const page = await getRoomBySlug(params.room, params.lang);
        if (page.error && page.error.status == 401) {
          throw new Error(
            'Missing or invalid credentials. Have you created an access token using the Strapi admin panel? http://localhost:1337/admin/'
          )
        }
    
        if (page.data.length === 0) return null
        const contentSections = page.data[0].attributes.contentSections
        console.log('eccoloooooooooooo', contentSections)
        // return <Room data={page.data[0]}/>
        return contentSections.map((section: any, index: number) =>
          sectionRenderer(section, index)
        )
    
      } catch (error: any) {
        window.alert('Missing or invalid credentials')
      }
}