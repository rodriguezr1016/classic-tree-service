"use client"
import React from 'react'
import "./index.css"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
const Header = () => {
  const path = usePathname();
  return (
    <header>
      <div className='header'>
      <button className='contact'>
        Call now! <br />
        <a href="tel: +12096050373">(209)605-0373</a> Or <a href="tel: +12098742904">(209)874-2904</a>
      </button>
      <Link href='/'>
        <h1 className='bname'>Classic Tree Service</h1>
        </Link>
        <div className='line'></div>
      <ul>
        <li className={path ==='/' ? "active": ''}>
          <Link href='/'>
            Home
          </Link>
        </li>
        <li className={path ==='/about' ? "active": ''}>
          <Link href='/about'>
            About Us
          </Link>
        </li>
        <li className={path ==='/contact' ? "active": ''}><Link href="/contact">
          Contact Us
          </Link>
          </li>
      </ul>
        
      

      </div>
    </header>
  )
}

export default Header