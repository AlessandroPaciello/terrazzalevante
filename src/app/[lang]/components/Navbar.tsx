"use client";
import Logo from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { getStrapiMedia } from "../shared/utils/api-helpers";
import { Button, Collapse, Navbar, Typography } from "@material-tailwind/react";

interface NavLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
}

interface NavLinkImg extends NavLink {
  img: any;
}

interface MobileNavLink extends NavLink {
  closeMenu: () => void;
}

function NavLink({ url, text }: NavLink) {
  const path = usePathname();

  return (
    <li className="flex">
      <Link
        href={url}
        className={`flex items-center mx-4 -mb-1 border-b-2`}
      >
        {text}
      </Link>
    </li>
  );
}

function MobileNavLink({ url, text, closeMenu }: MobileNavLink) {
  const path = usePathname();
  const handleClick = () => {
    closeMenu();
  };
  return (
    <a className="flex">
      <Link
        href={url}
        onClick={handleClick}
        className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-900 ${
          path === url && "dark:text-violet-400 dark:border-violet-400"
        }}`}
      >
        {text}
      </Link>
    </a>
  );
}

export default function NavbarComponent({
  logo,
  menu,
  title,
}: {
  logo?: NavLinkImg;
  menu?: NavLink[] | null;
  title?: string | null;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  const navbarLogoUrl = getStrapiMedia(
    logo?.img.data.attributes.url
  );

  return (
    <Navbar variant="filled" shadow className=" z-50 top-0 mx-auto rounded-lg border-none max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4 bg-primary">
      <div className="container mx-auto flex items-center justify-between text-tertiary">
        <Button size="sm" variant="gradient" className="bg-secondary hover:drop-shadow-md hover:scale-105 duration-200">
          <Link href={logo!.url}>
            <img className="h-6 w-6" src={navbarLogoUrl!} alt="" />
          </Link>
        </Button>
        <div className="w-full grow ml-4">
          <Typography
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          {title}
        </Typography>
        </div>
        <div className="flex items-center gap-x-1">
          <Button size="sm" variant="gradient" className="bg-secondary hover:drop-shadow-md hover:scale-105 duration-200" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {!mobileMenuOpen ? <Bars3Icon className="h-6 w-6 text-tertiary" /> : <XMarkIcon className="h-6 w-6 text-tertiary" />}
          </Button>
        </div>
      </div>


      <Collapse open={mobileMenuOpen}
      >
        
        <ul className="container mx-auto py-4 text-tertiary">
          {menu?.map((item, index) => (
            <li key={index} >
              <Link href={item.url} className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-secondary hover:text-active duration-200">{item.text}</Link>
            </li>
          ))}
        </ul>
      </Collapse>
    </Navbar>
  )
}
