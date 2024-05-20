import Hero from "../../components/Hero";
import Features from "../../components/Features";
import Testimonials from "../../components/Testimonials";
import Pricing from "../../components/Pricing";
import Email from "../../components/Email";
import Booking from "../../components/booking";
import HeroRooms from "../../components/HeroRooms";
import FeatureRooms from "../../components/FeatureRooms";
import Gallery from "../../components/Gallery";
import About from "../../components/Services";

export function sectionRenderer(section: any, index: number) {
  switch (section.__component) {
    case "sections.hero":
      return <Hero key={index} data={section} />;
    case "sections.hero-rooms":
      return <HeroRooms data={section} key={index} />
    case "sections.booking":
      return <Booking data={section} key={index} />
    case "sections.gallery":
      return <Gallery data={section} key={index}/>
    case "sections.features":
      return <Features key={index} data={section} />;
    case "sections.feture-rooms":
      return <FeatureRooms key={index} data={section} ></FeatureRooms>
    case "sections.testimonials-group":
      return <Testimonials key={index} data={section} />;
    case "sections.pricing":
      return <Pricing key={index} data={section} />;
    case "sections.services":
      return <About key={index} data={section}/>
    case "sections.lead-form":
      return <Email key={index} data={section} />;
    default:
      return null;
  }
}
