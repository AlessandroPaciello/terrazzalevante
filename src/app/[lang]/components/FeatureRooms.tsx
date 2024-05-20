'use client';

import React, { useEffect, useState } from 'react'
import { StrapiFeture } from '../shared/model/strapi/elements';
import { FeatureExtend } from './Features';
import { getStrapiMedia } from '../shared/utils/api-helpers';
import { useIsVisible } from '../shared/hook/isVisible';
import { Button } from '@material-tailwind/react';
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from 'next/link';

interface FeatureRoomsProps {
  data: {
    id: number;
    title: string;
    description: string;
    feature: StrapiFeture[]
  }
}

const FeatureRooms = ({ data }: FeatureRoomsProps) => {
  const cardsRef: React.RefObject<HTMLDivElement>[] = []
  return (
    <section id="fetureRooms" className="w-full max-w-7xl relative mx-auto">
      <div className='snap-y snap-mandatory'>
        <h3 className="my-3 text-3xl font-semibold text-center text-tertiary">{data.title}</h3>
        <div className='flex flex-col gap-16'>
          {data.feature.map((feature: StrapiFeture, index: number) => {
            const imgUrl = getStrapiMedia(feature.url);
            const [active, setActive] = useState(false);
            const cardRef = React.useRef<HTMLDivElement>(null);
            const cardIsVisible = useIsVisible(cardRef);
            cardsRef.push(cardRef);

            useEffect(() => {
              if (!cardIsVisible) {
                setActive(false);
              }
            }, [cardIsVisible, active]);

            return <div key={index} className={`group duration-300 relative flex flex-col md:flex-row overflow-hidden`}>
              <div className={`w-full h-72 min-w-full md:min-w-80 md:h-80 md:w-80 group`}>
                <FeatureExtend data={{ ...feature }} key={index} extend={true} active={active} setActive={setActive} cardRef={cardRef} />
              </div>
              <div className='w-full flex flex-col mt-4'>
                {/* title */}
                <h3 ref={cardRef} className={`text-4xl font-extrabold text-tertiary uppercase`}>{
                  feature.room.data.attributes.title.split(' ').map((word, i) => {
                    return <span key={i} className={`${i % 2 == 0 ? 'text-almond-950' : 'text-almond-600 ml-6'}`}>{word} <br /></span>
                  })
                }</h3>

                {/* description */}
                <div className={`${cardIsVisible ? 'translate-x-0' : 'translate-x-full'} w-full duration-300 delay-300 py-6 px-8`}>
                  <p className={`text-tertiary text-left`}>{feature.room.data.attributes.description}</p>
                </div>

                {/* button */}
                <div className='w-min ml-auto mr-0 mt-auto mb-0'>
                  <Button type='submit' className='m-2 p-2 pr-4 pl-8 text-center text-tertiary text-sm bg-secondary hover:drop-shadow-md hover:scale-105 rounded-lg font-semibold leading-7 hover:bg-secondary hover:text-active duration-200'>
                    <Link href={feature.url} className='flex gap-2'>
                      <p className="text-center w-max text-quaternary">{feature.text}</p>
                      <ArrowRightIcon className='w-4'></ArrowRightIcon>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          })}
        </div>
      </div>
    </section>
  )
}

export default FeatureRooms