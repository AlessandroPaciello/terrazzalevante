'use client'
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { getLocale } from "../../utils/api-helpers";
import { DateRange, DayPicker } from "react-day-picker";
import { addDays, format } from "date-fns";
import { Button, Input, List, ListItem, Option, Popover, PopoverContent, PopoverHandler, Select } from "@material-tailwind/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { RenderInputProps } from "../../model/render/input";
import ScrollContainer from "react-indiana-drag-scroll";


export const RenderInputData: React.FC<RenderInputProps> = ({input}) => {
    const [date, setState] = useState(new Date());
    const [pastMonth, setPastMonth] = useState(new Date());
    const pathname = usePathname();
    const [locale] = useState(getLocale(pathname))
    const defaultSelected: DateRange = {
        from: pastMonth,
        to: addDays(pastMonth, 4)
    };

    const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

    let footer = <p className='w-full text-center text-quaternary text-sm'>Dal&nbsp;
        <span className='text-tertiary font-semibold'>
            {format(range?.from!, "PPP", { locale: locale })}
        </span> al <span className='text-tertiary font-semibold'>
            {format(range?.to!, "PPP", { locale: locale })}
        </span>
    </p>;

    return <Popover placement="bottom">
        <PopoverHandler>
            <Input
                labelProps={{ className: 'text-quaternary text-sm' }}
                label={input.label}
                onChange={e => setState(new Date(e.target.value))}
                placeholder={input.placeholder}
                // value={date ? `Dal ${format(date, "PPP", { locale: locale })} al ${format(defaultSelected.to!, "PPP", { locale: locale })}` : ""}
                crossOrigin={undefined}
                className={`border-secondary rounded-lg text-tertiary cursor-pointer focus:border-secondary`}
            />
        </PopoverHandler>
        <PopoverContent className='z-50 bg-primary rounded-xl shadow-md shadow-gray-900/10'>
            <DayPicker
                id="test"
                mode="range"
                locale={locale}
                defaultMonth={pastMonth}
                selected={range}
                footer={footer}
                onSelect={setRange}
                showOutsideDays
                className="border-0"
                classNames={{
                    caption: "flex justify-center py-2 mb-4 relative items-center",
                    caption_label: "text-sm font-medium text-tertiary",
                    nav: "flex items-center",
                    nav_button:
                        "h-6 w-6 bg-transparent p-1 rounded-md transition-colors duration-300",
                    nav_button_previous: "absolute left-1.5",
                    nav_button_next: "absolute right-1.5",
                    table: "w-full border-collapse",
                    head_row: "flex font-medium text-tertiary",
                    head_cell: "m-0.5 w-9 font-normal text-sm",
                    row: "flex w-full mt-2",
                    cell: "text-quaternary rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                    day: "h-9 w-9 p-0 font-normal",
                    day_range_end: "day-range-end",
                    day_selected:
                        "rounded-md bg-secondary text-quaternary",
                    // day_today: "rounded-md bg-gray-200 text-gray-900",
                    day_outside:
                        "day-outside text-tertiary opacity-50 aria-selected:bg-secondary aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                    day_disabled: "text-gray-500 opacity-50",
                    day_hidden: "invisible line-through",
                }}
                components={{
                    IconLeft: ({ ...props }) => (
                        <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2 text-tertiary" />
                    ),
                    IconRight: ({ ...props }) => (
                        <ChevronRightIcon {...props} className="h-4 w-4 stroke-2 text-tertiary" />
                    ),
                }}
            />
        </PopoverContent>
    </Popover>
}

export const RenderInputText: React.FC<RenderInputProps> = ({ input }) => {
    return <Input
        shrink={true}
        labelProps={{ className: 'text-quaternary text-sm' }}
        containerProps={{className: 'focus:!border-secondary'} }
        label={input.label}
        placeholder={input.placeholder}
        // value={date ? `Dal ${format(date, "PPP", { locale: locale })} al ${format(defaultSelected.to!, "PPP", { locale: locale })}` : ""}
        crossOrigin={undefined}
        className={`!border-secondary rounded-lg text-tertiary cursor-pointer`}
    />
}

export const RenderInputSelect: React.FC<RenderInputProps> = ({ input }) => {
    const { options } = input
    const [value, setValue] = useState<string>('')

    const selectedClass = (id: string) => {
        if (value == id) {
            return 'shadow-inner align-text-bottom'
        }
    }

    return <Popover placement="bottom">
        <PopoverHandler>
            <Input
                labelProps={{ className: 'text-quaternary text-sm !border-secondary' }}
                containerProps={{className: '!border-secondary'} }
                label={input.label}
                placeholder={input.placeholder}
                crossOrigin={undefined}
                value={value}
                readOnly={true}
                color="red"
                className={`min-w-max border-secondary rounded-lg text-tertiary cursor-pointer focus:border-secondary`}
            />
        </PopoverHandler>
        <PopoverContent className='w-fit z-50 bg-primary rounded-xl shadow-md shadow-gray-900/10 p-0'>

            <List className="w-max h-max text-tertiary p-2 gap-2 rounded-lg grid grid-cols-3 overflow-hidden">
                {options?.map((o, i) => <ListItem
                    key={i}
                    className="p-0 h-9 w-fit min-w-9"
                    onClick={e => setValue((e.target as HTMLElement).id)}
                >
                    <Button id={o.value} value={o.value} className={`p-1 text-center ${selectedClass(o.value)} text-tertiary text-sm w-full bg-secondary hover:drop-shadow-md hover:scale-105 rounded-lg font-semibold leading-7 hover:bg-secondary hover:text-active duration-200`}>{o.label}</Button>
                </ListItem>)}
            </List>
        </PopoverContent>
    </Popover>
}