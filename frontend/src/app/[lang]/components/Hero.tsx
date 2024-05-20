"use client"

import Image from "next/image";
import { getStrapiMedia } from "../shared/utils/api-helpers";
import { useState } from "react";
import creattion from "../shared/fonts/creattion";

interface Button {
  id: string;
  url: string;
  text: string;
  type: string;
  newTab: boolean;
}

interface Picture {
  id: string;
  attributes: {
    url: string;
    name: string;
    alternativeText: string;
  };
};

export interface HeroProps {
  data: {
    id: number;
    title: string;
    description: string;
    picture: {
      data: Picture[]
    };
    buttons: Button[];
  };
}

export default function Hero({ data }: HeroProps) {
  const imgUrl: (string | null)[] = data.picture.data.map(p => getStrapiMedia(p.attributes.url))

  const [activeImage, setActiveImage] = useState(0);
  const [active, setActive] = useState(true);
  const handlerActiveImg = (index: number) => setActiveImage(index);
  const setActiveSlide = (index: number) => activeImage !== index ? 'opacity-0' : 'opacity-100';
  const setActiveClass = () => active ? 'w-3/4' : 'w-full';
  const setTtitleClass = () => active ? 'opacity-0' : 'opacity-100';

  return (
    <section id="hero" className="w-full max-w-7xl relative mx-auto">
      <div className="w-full h-[84vh] flex flex-col md:flex-row-reverse overflow-hidden">
        {/* IMMAGINE CONTAINER */}
        <div className={`relative w-full min-w-max h-full rounded-lg overflow-hidden transition-all duration-200`}>
          {/* IMMAGINI */}
          <div className={`absolute w-full h-full top-0 left-0 -z-10 roudded-lg shadow-md shadow-gray-900/10`}>
            {imgUrl.map((url, index) => (
              <Image
                key={index}
                className={`${setActiveSlide(index)} transition-all duration-400 absolute w-full h-full inset-0 object-cover object-bottom`}
                src={url || ""}
                fill={true}
                alt="image"
              />
            ))}
          </div>

          {/* CONTAINER */}
          <div className={`container w-full h-full mx-auto bg-gradient-to-t from-white/0 from-0% via-slate-300/20 via-50% to-gray-900/45`}
            onClick={(e) => setActive(!active)}
          >
            <div className="w-full h-full flex flex-col justify-between text-center p-4">
              {/* TITLE */}
              <h1 className={`${creattion.className} capitalize font-medium text-7xl tracking-wide w-full mb-4 text-white leading-none lg:text-6xl`}>
                {data.title}
              </h1>
              {/* DESCRIPTION */}
              {/* <div className={`container flex flex-col justify-center mx-auto max-h-min`}>
                <HighlightedText
                  text={data.description}
                  tag="p"
                  className="p-4 text-white text-sm mb-4"
                  color=""
                />
              </div> */}
            </div>
          </div>
        </div>
        <ControllerImgActive
        imgUrl={imgUrl}
        active={active}
        activeImage={activeImage}
        handlerActiveImg={handlerActiveImg}
      >
      </ControllerImgActive>
      </div>
    </section>
  );
}

interface ControllerImg {
  imgUrl: (string | null)[],
  active: boolean,
  activeImage: number,
  handlerActiveImg: (index: number) => void,
  children?: React.ReactNode
}
const ControllerImgActive = ({ imgUrl, handlerActiveImg, active, activeImage }: ControllerImg) => {
  const md = `md:w-4/6 md:float-right md:right-2 md:translate-y-full md:top-auto md:absolute md:mt-6`;
  const lg = `lg:w-1/2`;
  
  // attiva al click
  const setActiveButton = (index: number) => activeImage !== index ? 'brightness-50' : 'brightness-100';

  // inserisce le classi in base alla width
  // const setShowClass = (active: boolean) => !active ? `collapse md:!hidden` : '!visible';
  const setShowClass = (active: boolean) => !active ? `w-0 h-0 !min-w-0` : '!visible h-full w-full md:w-1/4';


  return <div className={`${setShowClass(active)} left-0 h-1/4 md:h-full min-w-28 flex flex-row md:flex-col gap-4 duration-200`}>
    {imgUrl.map((url, index) => (
      <div className={`${setActiveButton(index)} ${!active ? 'w-0 h-0' : 'h-full w-full' } md:h-1/3 pt-4 md:pt-0 md:pr-4 transition-all`}
        key={index}
      >
        <Image
          width={800}
          height={800}
          src={url || ""}
          // fill={true}
          alt="image"
          className={`w-full h-full object-cover object-left rounded-lg`}
          onClick={(e) => handlerActiveImg(index)}
        />
      </div>
    ))}
  </div>

  // return <div className={`relative top-0 w-full h-32 sm:h-32 mt-4 flex !visible gap-2 bg-primary p-2 shadow-md shadow-gray-900/10
  //                         ${md} ${lg} ${setShowClass(active)} md:bottom-32 md:mb-2`}>
  //   {imgUrl.map((url, index) => (
  //     <div className={`${setActiveButton(index)} h-full bg-slate-600 transition-all`}
  //       key={index}
  //     >
  //       <Image
  //         sizes="100%"
  //         src={url || ""}
  //         fill={true}
  //         alt="image"
  //         className={`w-full h-full object-cover object-left`}
  //         onClick={(e) => handlerActiveImg(index)}
  //       />
  //     </div>
  //   ))}
  // </div>
}


