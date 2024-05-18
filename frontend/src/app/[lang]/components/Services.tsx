'use client'
import React from 'react'
import { StrapiAbout } from '../shared/model/strapi/elements'
import { Chip, List, ListItem, ListItemPrefix, ListItemSuffix, Tooltip, select } from '@material-tailwind/react'
import ScrollContainer from 'react-indiana-drag-scroll'
import { StrapiRoom } from '../shared/model/strapi/shared'

export interface ServiceProps {
    data: {
        title: string
        description: string
        services: {
            data: StrapiRoom
        }
    }
}
const Services: React.FC<ServiceProps> = ({ data }) => {
    return (<section id="services" className='w-full max-w-7xl relative mx-auto col-span-2'>
        <h3 className="my-3 text-3xl font-semibold text-center text-tertiary">{data.title}</h3>
        <List className='w-full h-full row-span-3 md:col-span-2 overflow-x-scroll scrollbar-none shadow-gray-900/10 shadow-inner rounded-lg scrollbar-track-black scrollbar-thin'>
            <ScrollContainer className="scroll-container">
                {
                    data.services.data.attributes.about.map(about => {
                        const variableSplit = '|'
                        const values = about.value.split(variableSplit);
                        return <ListItem key={about.id} selected={false} ripple={false}>
                            <ListItemPrefix>
                                <p className="text-center w-max text-quaternary">{about.label}</p>
                            </ListItemPrefix>
                            <ListItemSuffix className='flex gap-1 ml-0'>
                                {values.map(v =>
                                    <Tooltip content={v} placement="bottom"
                                        className="border border-secondary bg-primary text-tertiary px-4 py-3 shadow-md shadow-gray-900/10 z-50">
                                        <Chip
                                            value={<p className='truncate max-w-min'>{v}</p>}
                                            variant="ghost"
                                            size="sm"
                                            className="rounded-full bg-secondary text-quaternary px-3 py-1"
                                        />
                                    </Tooltip>
                                )}
                            </ListItemSuffix>
                        </ListItem>
                    })
                }
            </ScrollContainer>
        </List>
    </section>)
}

export default Services