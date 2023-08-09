'use client'

import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false)
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2  bg-emerald-900 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2  whitespace-nowrap uppercase text-white"
              href="/"
            >
              <Image src="/icon.svg" width={45} height={45} alt="Logo" className="inline-block" />
              <Image src="/text.svg" width={180} height={50} alt="Logo" className="inline-block" />
            </Link>

            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <Image src="/menu.svg" width={50} height={50} alt="menu" className="inline-block" />
            </button>
          </div>
          <div
            className={'lg:flex flex-grow items-center' + (navbarOpen ? ' flex' : ' hidden')}
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase leading-snug text-white hover:opacity-75 font-serif"
                  href="/catalog"
                >
                  <span className="ml-2">Catalog</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase leading-snug text-white hover:opacity-75 font-serif"
                  href="/account"
                >
                  <span className="ml-2">Account</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase leading-snug text-white hover:opacity-75 font-serif"
                  href="/login"
                >
                  <span className="ml-2">Log in</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase leading-snug text-white hover:opacity-75 font-serif"
                  href="/registration"
                >
                  <span className="ml-2">Register</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
