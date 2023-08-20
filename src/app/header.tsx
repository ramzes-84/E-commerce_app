'use client';

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

export default function Navbar({ authorized }: { authorized: boolean }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2  bg-emerald-900 mb-3">
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
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase leading-snug text-white hover:opacity-75"
                  href="/catalog"
                >
                  <span className="ml-2">Catalog</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    authorized
                      ? 'px-3 py-2 flex items-center text-xs uppercase leading-snug text-white hover:opacity-75'
                      : 'hidden'
                  }
                  href="/account"
                >
                  <span className="ml-2">Account</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    authorized
                      ? 'hidden'
                      : 'px-3 py-2 flex items-center text-xs uppercase leading-snug text-white hover:opacity-75'
                  }
                  href="/login"
                >
                  <span className="ml-2">Log in</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    authorized
                      ? 'hidden'
                      : 'px-3 py-2 flex items-center text-xs uppercase leading-snug text-white hover:opacity-75'
                  }
                  href="/registration"
                >
                  <span className="ml-2">Register</span>
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className={
                    authorized
                      ? 'px-3 py-2 flex items-center text-xs uppercase leading-snug text-white hover:opacity-75'
                      : 'hidden'
                  } onClick={() =>{}}
                >
                  <span className="ml-2">Log out</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
