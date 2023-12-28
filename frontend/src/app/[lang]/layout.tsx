import type { Metadata } from "next";
import "./globals.css";
import { getStrapiMedia, getStrapiURL } from "./utils/api-helpers";
import { fetchAPI } from "./utils/fetch-api";

import { i18n } from "../../../i18n-config";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import {FALLBACK_SEO} from "@/app/[lang]/utils/constants";


async function getGlobal(lang: string): Promise<any> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!token) throw new Error("The Strapi API Token environment variable is not set.");

  const path = `/global`;
  const options = { headers: { Authorization: `Bearer ${token}` } };

  const urlParamsObject = {
    populate: [
      // "metadata.shareImage",
      // "favicon",
      // "notificationBanner.link",
      // "navbar.menu",
      // "navbar.navbarLogo.logoImg",
      // "footer.footerLogo.logoImg",
      // "footer.menuLinks",
      // "footer.legalLinks",
      // "footer.socialLinks",
      // "footer.categories",
      "navbar.menu",
      "navbar.logo",
      "navbar.logo.img"
    ],
    locale: lang,
  };
  return await fetchAPI(path, urlParamsObject, options);
}

export async function generateMetadata({ params } : { params: {lang: string}}): Promise<Metadata> {
  const meta = await getGlobal(params.lang);

  if (!meta.data) return FALLBACK_SEO;

  const { metadata, favicon } = meta.data.attributes;
  const { url } = favicon.data.attributes;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
    icons: {
      icon: [new URL(url, getStrapiURL())],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const global = await getGlobal(params.lang);

  // console.log('global ------->', global.data.attributes)
  // TODO: CREATE A CUSTOM ERROR PAGE
  if (!global.data) return null;
  const { notificationBanner, navbar, footer } = global.data.attributes;

  // const footerLogoUrl = getStrapiMedia(
  //   footer.footerLogo.logoImg.data.attributes.url
  // );

  return (
    <html lang={params.lang}>
      <body>
        <main className="bg-primary min-h-screen">
          <Navbar
            logo={navbar.logo}
            menu={navbar.menu}
            title={navbar.title}
          // links={navbar.links}
          // logoUrl={navbarLogoUrl}
          // logoText={navbar.navbarLogo.logoText}
          />
          {/* {children} */}
          <div>Hello world</div>
        </main>

        {/* <Banner data={notificationBanner} />

        <Footer
          logoUrl={footerLogoUrl}
          logoText={footer.footerLogo.logoText}
          menuLinks={footer.menuLinks}
          categoryLinks={footer.categories.data}
          legalLinks={footer.legalLinks}
          socialLinks={footer.socialLinks}
        /> */}
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
