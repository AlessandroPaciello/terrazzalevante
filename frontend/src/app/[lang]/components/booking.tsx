'use client'

import React, { useState } from 'react'
import { Alert, Button, Chip, List, ListItem, ListItemPrefix, ListItemSuffix, Tab, TabPanel, Tabs, TabsBody, TabsHeader, Tooltip } from '@material-tailwind/react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { StrapiBooking } from '../shared/model/strapi/sections';
import { BookingAboutProps, BookingFormProps } from '../shared/model/components/booking';
import { RenderInputType } from '../shared/utils/render-components-type';
import Services, { ServiceProps } from './Services';

const Booking: React.FC<StrapiBooking> = ({ data }) => {
    const { rooms, inputs, submit, success } = data

    const [allertOpen, setAllertOpen] = useState(success.show)

    return (<>
        <section id="booking" className='w-full relative mx-auto max-w-7xl mt-16 mb-16'>
            <div className="container mx-auto py-4 space-y-2">
                <h2 className="text-5xl font-bold text-center text-tertiary">{data.title}</h2>
                <p className="text-center text-quaternary">{data.subText}</p>
            </div>

            <Tabs value={rooms.data[0].attributes.title} className="!overflow-visible">
                <TabsHeader className='gap-2 w-full shadow-md shadow-gray-900/10 text-quaternary font-medium'
                    indicatorProps={{
                        className: "!text-tertiary !bg-secondary",
                    }}>
                    {rooms.data.map(r => (
                        <Tab key={r.attributes.title} value={r.attributes.title}>
                            {r.attributes.title}
                        </Tab>
                    ))}
                </TabsHeader>
                <TabsBody className='h-full shadow-md shadow-gray-900/10 overflow-visible my-4 rounded-lg transition-transform duration-200'
                >
                    {rooms.data.map(room => {
                        const serviceProps: ServiceProps = {
                            data: {
                                title: room.attributes.title,
                                description: room.attributes.description,
                                services: {
                                    data: room
                                }
                            }
                        }
                        return <TabPanel key={room.attributes.title} value={room.attributes.title} className='w-full h-full relative'>
                        <p className="text-center text-quaternary">{room.attributes.description}</p>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 overflow-visible mt-4'>
                            <Services data={serviceProps.data} />
                            <BookingForm inputs={inputs} submit={submit} />
                        </div>
                    </TabPanel>
                    })}
                </TabsBody>
                <Alert open={allertOpen} onClose={() => setAllertOpen(false)}
                    variant='outlined'
                    className='z-50 w-full text-tertiary text-center font-bold justify-between'
                    action={<Button variant="text" onClick={() => setAllertOpen(false)} className='text-tertiary hover:text-active'>{success.close}</Button>}
                >
                    <p className='flex h-full justify-center items-center'>{success.label}</p>
                </Alert>
            </Tabs>

        </section>
        
    </>)
}

const BookingForm: React.FC<BookingFormProps> = ({ inputs, submit }) => {
    return <>
        <div className='pb-5 grid grid-cols-2 grid-flow-row gap-y-6'>
            {
                inputs.map(input => <div className={`w-full ${input.extend === true ? 'col-span-2' : 'col-span-1'}`}>
                    {RenderInputType(input)}
                </div>)
            }
        </div>
        <div className='w-min ml-auto mr-0'>
            <Button type='submit' className='p-1 px-2 text-center text-tertiary text-sm bg-secondary hover:drop-shadow-md hover:scale-105 rounded-lg font-semibold leading-7 hover:bg-secondary hover:text-active duration-200'>
                <p className="text-center w-max text-quaternary">{submit.text}</p>
            </Button>
        </div>

    </>
}

export default Booking