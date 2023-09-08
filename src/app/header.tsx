'use client';

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { logout } from './account/account-actions';
import { FaShoppingCart } from 'react-icons/fa';

function NavLink({ name, link, callback, img }: { name: string; link?: string; img?: boolean; callback?: () => void }) {
  return (
    <li className="nav-item">
      {link && (
        <Link
          className="px-3 py-2 flex items-center text-xs uppercase leading-snug text-white hover:opacity-75"
          href={link}
        >
          {img && <FaShoppingCart />}
          <span className="ml-2">{name}</span>
        </Link>
      )}
      {callback && (
        <button
          className={'px-3 py-2 flex items-center text-xs uppercase leading-snug text-white hover:opacity-75'}
          onClick={callback}
        >
          <span className="ml-2">{name}</span>
        </button>
      )}
    </li>
  );
}

type navItem = {
  name: string;
  link?: string | '';
  visibleForAuthorized?: boolean;
  img?: boolean;
  callback?: () => void;
};

export default function Navbar({ authorized }: { authorized: boolean }) {
  const router = useRouter();
  function handleLogout() {
    logout();
    router.refresh();
    router.push('/login');
  }

  const [navbarOpen, setNavbarOpen] = React.useState(false);

  const navItems: navItem[] = [
    { name: `Cart`, link: '/basket', img: true },
    { name: 'Catalog', link: '/catalog' },
    { name: 'About Us', link: '/about' },
    { name: 'Account', visibleForAuthorized: true, link: '/account' },
    { name: 'Log in', visibleForAuthorized: false, link: '/login' },
    { name: 'Register', visibleForAuthorized: false, link: '/registration' },
    { name: 'Log out', visibleForAuthorized: true, callback: () => handleLogout() },
  ];
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2  bg-emerald-900 z-10 drop-shadow-md ">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between md:w-auto md:static md:block md:justify-start">
            <Link
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2  whitespace-nowrap uppercase text-white"
              href="/"
            >
              <Image src="/icon.svg" width={45} height={45} alt="Logo" className="inline-block" />
              <Image src="/text.svg" width={180} height={50} alt="Logo" className="inline-block" />
            </Link>
            <button
              className="cursor-pointer leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block md:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <Image src="/menu.svg" width={50} height={50} alt="menu" className="inline-block" />
            </button>
          </div>
          <div className={'md:flex flex-grow items-center' + (navbarOpen ? ' flex' : ' hidden')} data-testid="nav">
            <ul className="flex flex-col md:flex-row list-none md:ml-auto font-serif">
              {navItems.map((item) => {
                return (
                  (item.visibleForAuthorized === undefined || item.visibleForAuthorized === authorized) && (
                    <NavLink
                      key={item.name}
                      link={item.link}
                      name={item.name}
                      callback={item.callback}
                      img={item.img}
                    />
                  )
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
