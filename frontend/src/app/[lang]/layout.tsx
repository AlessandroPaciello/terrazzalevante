import type { Metadata } from "next";
import "./globals.css";
import { getStrapiMedia, getStrapiURL } from "./shared/utils/api-helpers";
import { fetchAPI } from "./shared/utils/fetch-api";

import { i18n } from "../../../i18n-config";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { FALLBACK_SEO } from "./shared/utils/constants";
import geometria from "./shared/fonts/geometria";


async function getGlobal(lang: string): Promise<any> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!token) throw new Error("The Strapi API Token environment variable is not set.");

  const path = `/global`;
  const options = { headers: { Authorization: `Bearer ${token}` } };

  const urlParamsObject = {
    populate: [
      // "notificationBanner.link",
      // "navbar.menu",
      // "navbar.navbarLogo.logoImg",
      // "footer.footerLogo.logoImg",
      // "footer.menuLinks",
      // "footer.legalLinks",
      // "footer.socialLinks",
      // "footer.categories",
      "metadata.shareImage",
      "favicon",
      "navbar.menu",
      "navbar.logo",
      "navbar.logo.img",
      "footer.footerLogo.logoImg",
      "footer.menuLinks"
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

  const footerLogoUrl = getStrapiMedia(
    footer.footerLogo.logoImg.data.attributes.url
  );

  return (
    <html lang={params.lang} className={`${geometria.className} scroll-smooth`}>
      <body className="bg-primary">
      <Navbar
            logo={navbar.logo}
            menu={navbar.menu}
            title={navbar.title}
          // links={navbar.links}
          // logoUrl={navbarLogoUrl}
          // logoText={navbar.navbarLogo.logoText}
          />
        <main className="min-h-screen p-6 overflow-hidden">
          {children}
        </main>

        {/* <Banner data={notificationBanner} /> */}

        <Footer
          logoUrl={footerLogoUrl}
          logoText={footer.footerLogo.logoText}
          menuLinks={footer.menuLinks}
          // categoryLinks={footer.categories.data}
          // legalLinks={footer.legalLinks}
          // socialLinks={footer.socialLinks}
        />
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
