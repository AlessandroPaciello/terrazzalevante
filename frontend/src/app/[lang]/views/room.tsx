import About from "../components/Services";
import Gallery, { GalleryProps } from "../components/Gallery";
import Hero, { HeroProps } from "../components/Hero";
import HeroRooms, { HeroRoomsProps } from "../components/HeroRooms";
import { StrapiRoom } from "../shared/model/strapi/shared";

export default function PostList({ data }: { data: StrapiRoom }) {
    const heroProps: HeroRoomsProps = {
        data: {
            id: data.id,
            title: data.attributes.title,
            text: data.attributes.description,
            picture: {
                data: data.attributes.image.data
            }
        }
    }
    const galleryProps: GalleryProps = {
        data: {
            title: data.attributes.title,
            text: data.attributes.description,
            room: {
                data: data
            }
        }
    }

    const aboutProos = {
        data: {
            title: data.attributes.title,
            description: data.attributes.description,
            services: {
                data: data
            }
        }
    }
    return <section id='room' className="w-full">
        <HeroRooms data={heroProps.data} />
        <Gallery data={galleryProps.data}/>
        <About data={aboutProos.data} />
    </section>
}