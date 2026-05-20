"use client"
import React from 'react'
import "./index.css"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
const Header = () => {
  const path = usePathname();
  return (
    <header className="site-header">
      <div className="topbar">
        <span>Affordable tree service in Modesto, CA</span>
        <div>
          <a href="tel:+12096050373">(209) 605-0373</a>
          <a href="tel:+12098742904">(209) 874-2904</a>
        </div>
      </div>
      <div className='header'>
        <Link href='/' className='brand' aria-label="Classic Tree Service home">
          <span className="brand__mark" aria-hidden="true">
            <Image src="/logo-word.png" alt="" width={227} height={185} priority />
          </span>
          <span>
            <strong>Classic Tree Service</strong>
            <small>Licensed & insured local tree care</small>
          </span>
        </Link>
        <nav aria-label="Main navigation">
          <ul>
            <li className={path ==='/' ? "active": ''}>
              <Link href='/'>Home</Link>
            </li>
            <li className={path ==='/about' ? "active": ''}>
              <Link href='/about'>About</Link>
            </li>
            <li className={path ==='/contact' ? "active": ''}>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
        <Link className="quote-link" href="/contact">Free Estimate</Link>
      </div>
    </header>
  )
}

export default Header
