'use client'

import Link from "next/link";
import Image from "next/image";
import { getStrapiMedia } from "../shared/utils/api-helpers";
import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { FaInfo } from "react-icons/fa";
import { IoMdClose } from 'react-icons/io'
import { Swiper, SwiperSlide } from "swiper/react";
import { StrapiFeture } from "../shared/model/strapi/elements";
import "swiper/css";

interface FeatureProps {

  data: StrapiFeture;
  extend: boolean;
}

export function Feature({data: { showLink, newTab, url, text, room  }, extend}: FeatureProps) {
  const imgUrl = getStrapiMedia(room.data.attributes.image.data.attributes.url);
  const [active, setActive] = useState(false);

  return (
    <div className="relative w-full shadow-md shadow-gray-900/10 rounded-lg">
      <Button size="sm" className="bg-secondary p-3 !absolute z-20 left-auto right-0 m-2 rounded-full" variant="gradient"
        onClick={e => setActive(!active)}>
        {active ? <IoMdClose  className="h-4 w-4 scale-125 text-tertiary"/> : <FaInfo className="h-4 w-4 text-tertiary" />}
      </Button>
      <div className="relative w-full h-72 lg:h-80">
        <div className="relative w-full h-full shadow-gray-900/10 shadow-inner overflow-hidden rounded-lg cursor-pointer"
        onClick={e => setActive(true)}>
          <Image
            src={imgUrl || ""}
            fill={true}
            className={`absolute w-full h-full z-0 ${active ?  'blur-md' : ' blur-none'} duration-100`}
            alt="image"
          />
          <div id="container" className={`absolute w-full h-full z-10 overflow-hidden`}>
            <div className={`flex flex-col ${active ? '' : '-translate-x-full'} delay-100 duration-200`}>
              <h3 className="my-3 text-3xl font-semibold text-center text-tertiary">{room.data.attributes.title}</h3>
              <div className="space-y-1 leading-tight my-6 text-center">
                <p>{room.data.attributes.description}</p>
              </div>
              {showLink && url && text && (
                <div>
                  <Link
                    href={url}
                    target={newTab ? "_blank" : "_self"}
                    className="inline-block px-4 py-2 mt-4 text-sm font-semibold text-white transition duration-200 ease-in-out bg-violet-500 rounded-lg hover:bg-violet-600"
                  >
                    {text}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export interface FeatureExtendProps extends FeatureProps {
  active: boolean;
  setActive: any;
  cardRef : React.RefObject<HTMLDivElement> 
}
export function FeatureExtend({data: { room }, setActive, active, cardRef}: FeatureExtendProps) {
  const imgUrl = getStrapiMedia(room.data.attributes.image.data.attributes.url);
  const timeoutId = React.useRef<NodeJS.Timeout>();
  
  return (
    <div className="relative w-full h-full shadow-md shadow-gray-900/10 rounded-lg">
      {/* <Button size="sm" className="bg-secondary p-3 !absolute z-30 left-auto right-0 m-2 rounded-full" variant="gradient"
        onClick={e => setActive(!active)}>
        {active ? <IoMdClose  className="h-4 w-4 scale-125 text-tertiary"/> : <FaInfo className="h-4 w-4 text-tertiary" />}
      </Button> */}
      <div className={`relative w-full h-full`}>
        <div className={`relative w-full h-full shadow-gray-900/10 shadow-inner overflow-hidden rounded-lg cursor-pointer`}
        onClick={e => {
          if (timeoutId.current) {
            clearTimeout(timeoutId.current);
          }
          timeoutId.current = setTimeout(() => {
            cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
          }, 200);
          setActive(true)
        }}>
          <Image
            sizes="(max-width: 768px) 100vw,"
            src={imgUrl || ""}
            fill={true}
            className={`absolute w-full h-full gorup/feature z-10 duration-100`}
            alt="image"
          />
        </div>
      </div>
    </div>
  );
}

interface FeaturesProps {
  data: {
    heading: string;
    description: string;
    feature: StrapiFeture[];
    extend: boolean;
  };
}

export default function Features({ data }: FeaturesProps) {
  return (
    <section id="features" className="w-full mt-16 max-w-7xl relative mx-auto">
      <div className="container mx-auto py-4 space-y-2">
        <h2 className="text-5xl font-bold text-center text-tertiary">{data.heading}</h2>
        <p className="text-center text-quaternary">{data.description}</p>
      </div>
      <Swiper
        slidesPerView={'auto'}
        className="container max-w-7xl !overflow-visible"
        wrapperClass="!overflow-visible"
      >
      {data.feature.map((feature: StrapiFeture, index: number) => (
            <SwiperSlide key={index} className="w-full sm:!w-1/2 lg:!w-1/3 !h-full px-1">
              <Feature data={{ ...feature }} extend={data.extend} />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
}
