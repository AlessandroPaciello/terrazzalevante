'use client'
import React from 'react'
import { StrapiRoom } from '../shared/model/strapi/shared';
import { da } from 'date-fns/locale';
import { getStrapiMedia } from '../shared/utils/api-helpers';
import Image from 'next/image';
import { Picture } from '../shared/utils/model';

export interface GalleryProps {
    data: {
        title: string;
        text: string;
        room: {
            data: StrapiRoom
        }
    }
}
const Gallery = ({ data }: GalleryProps) => {
    const gallery = data.room.data.attributes.gallery.data;
    const rows = Math.ceil(gallery.length / 3);

    const galleryGrid = gallery.map((item: Picture, index: number) => {
        if (index % rows === 0) {
            return gallery.slice(index, index + rows);
        }
        else {
            return null
        }

    }).filter((item: any) => item !== null);
    
    return (
        <section id='gallery' className="w-full mt-16 max-w-7xl relative mx-auto">
            {/* {gallery.map((item: any, index: number) => {
                    const imgUrl = getStrapiMedia(item.attributes.url);
                    return <div key={index} className='w-full h-full'>
                        <Image
                            width={500}
                            height={index % 2 == 0 ? 500 : 800}
                            className="w-full h-80 rounded-lg object-cover object-center"
                            src={imgUrl}
                            alt="gallery-photo"
                        />
                    </div>
                })} */}

            
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 grid-flow-row-dense duration-200">
                {gallery.map((item: any, index: number) => {
                    const imgUrl = getStrapiMedia(item.attributes.url);
                    return <div key={index} className='w-full h-full delay-150 duration-200'>
                        <Image
                            width={500}
                            height={index % 2 == 0 ? 500 : 800}
                            className="w-full h-80 rounded-lg object-cover object-center"
                            src={imgUrl}
                            alt="gallery-photo"
                        />
                    </div>
                }).filter((item: any) => item !== null)}
            </div>

            {/*   */}


            {/* <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="grid gap-4">
                    <div>
                        <img
                            className="h-auto max-w-full rounded-lg object-cover object-center "
                            src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
                            alt="gallery-photo"
                        />
                    </div>
                    <div>
                        <img
                            className="h-auto max-w-full rounded-lg object-cover object-center"
                            src="https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                            alt="gallery-photo"
                        />
                    </div>
                    <div>
                        <img
                            className="h-auto max-w-full rounded-lg object-cover object-center"
                            src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                            alt="gallery-photo"
                        />
                    </div>
                </div>
                {/* <div className="grid gap-4">
                    <div>
                        <img
                            className="h-auto max-w-full rounded-lg object-cover object-center"
                            src="https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                            alt="gallery-photo"
                        />
                    </div>
                    <div>
                        <img
                            className="h-auto max-w-full rounded-lg object-cover object-center "
                            src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
                            alt="gallery-photo"
                        />
                    </div>
                    <div>
                        <img
                            className="h-auto max-w-full rounded-lg object-cover object-center"
                            src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                            alt="gallery-photo"
                        />
                    </div>
                </div>
                <div className="grid gap-4">
                    <div>
                        <img
                            className="h-auto max-w-full rounded-lg object-cover object-center"
                            src="https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                            alt="gallery-photo"
                        />
                    </div>
                    <div>
                        <img
                            className="h-auto max-w-full rounded-lg object-cover object-center"
                            src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                            alt="gallery-photo"
                        />
                    </div>
                    <div>
                        <img
                            className="h-auto max-w-full rounded-lg object-cover object-center "
                            src="https://docs.material-tailwind.com/img/team-3.jpg"
                            alt="gallery-photo"
                        />
                    </div>
                </div>
                <div className="grid gap-4">
                    <div>
                        <img
                            className="h-auto max-w-full rounded-lg object-cover object-center"
                            src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                            alt="gallery-photo"
                        />
                    </div>
                    <div>
                        <img
                            className="h-auto max-w-full rounded-lg object-cover object-center "
                            src="https://docs.material-tailwind.com/img/team-3.jpg"
                            alt="gallery-photo"
                        />
                    </div>
                    <div>
                        <img
                            className="h-auto max-w-full rounded-lg object-cover object-center"
                            src="https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                            alt="gallery-photo"
                        />
                    </div>
                </div>
                <div className="grid gap-4">
                    <div>
                        <img
                            className="h-auto max-w-full rounded-lg object-cover object-center"
                            src="https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                            alt="gallery-photo"
                        />
                    </div>
                    <div>
                        <img
                            className="h-auto max-w-full rounded-lg object-cover object-center"
                            src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
                            alt="gallery-photo"
                        />
                    </div>
                </div> */}
        </section>
    );
}

const generateImageGrid = (images: any, cols: any) => {
    if (images.length === 0) return null;

    const rows = Math.ceil(images.length / cols);
    const itemsPerColumn = Math.ceil(images.length / rows);

    let grid = [];
    for (let i = 0; i < cols; i++) {
        let column = [];
        for (let j = 0; j < itemsPerColumn; j++) {
            const index = i + j * cols;
            if (index < images.length) {
                column.push(
                    <div key={index}>
                        <img
                            className="h-auto max-w-full rounded-lg object-cover object-center"
                            src={images[index]}
                            alt="gallery-photo"
                        />
                    </div>
                );
            }
        }
        grid.push(
            <div key={i} className="grid gap-4">
                {column}
            </div>
        );
    }
    return grid;
};

export default Gallery