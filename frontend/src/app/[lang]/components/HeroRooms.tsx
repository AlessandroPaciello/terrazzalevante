'use client';
import React, { useEffect, useState } from 'react'
import { Picture } from '../shared/utils/model';
import { getStrapiMedia } from '../shared/utils/api-helpers';
import Image from 'next/image';
import RichText from './RichText';
import creattion from "../shared/fonts/creattion";

export interface HeroRoomsProps {
    data: {
        id: number;
        title: string;
        text: string;
        picture: Picture
    }
}
const HeroRooms = ({ data }: HeroRoomsProps) => {
    const url = getStrapiMedia(data.picture.data.attributes.url)

    return (
        <div className='relative w-full max-w-7xl rounded-lg overflow-hidden mx-auto h-[84vh] sm:h-screen'>
            <Image
                src={url}
                alt={data.picture.data.attributes.alternativeText || "none provided"}
                className="absolute z-0 w-full h-full object-cover object-center rounded-lg"
                width={data.picture.data.attributes.width}
                priority={true}
                height={data.picture.data.attributes.height}
            />
            <div className='relative z-10 p-4 py-16 md:p-8 md:py-24 w-full h-max bg-gradient-to-t from-white/0 from-0% via-slate-300/20 via-50% to-gray-900/45'>
                <h1 className={`${creattion.className} text-7xl font-medium mb-4 text-center text-white`}>{data.title}</h1>
                <RichText className='mt-9 text-center text-white' data={data.text} />
            </div>
            
        </div>
    )
}

export default HeroRooms