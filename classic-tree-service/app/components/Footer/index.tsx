"use client";

import React from 'react'
import './index.css'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEdgeStore } from "../../../lib/edgestore"
import ContactForm from '../ContactForm';
const Footer = () => {
    const location = usePathname();
    const [file, setFile] = React.useState<File | null>();
    const { edgestore } = useEdgeStore();
  return (
    <footer>
        <div className='formBox'>
            <ContactForm />
        </div>
        <div className='navbar'>
        <nav>
            <ul>
                <li className={location ==='/' ? "active": ''}> <Link href='/'>Home</Link></li>
                <li className={location ==='/about' ? "active": ''}> <Link href='/about'>About Us</Link></li>
                <li className={location ==='/contact' ? "active": ''}> <Link href='/contact'>Contact Us</Link></li>
            </ul>
        </nav>
        <img src="logo-word.png" alt="logo" />

        </div>
        
    </footer>
  )
}

export default Footer