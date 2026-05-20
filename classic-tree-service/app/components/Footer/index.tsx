"use client";

import React from 'react'
import './index.css'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ContactForm from '../ContactForm';
import { serviceAreas, treeServices } from '@/lib/site';
const Footer = () => {
    const location = usePathname();
  return (
    <footer className="site-footer">
        <div className='footer-quote'>
            <div>
                <p className="eyebrow">Free estimate</p>
                <h2>Get a clear, affordable tree service quote.</h2>
                <p>
                    Upload a few photos and tell us what you need trimmed, removed,
                    ground down, or cleaned up. We will help you compare practical options.
                </p>
            </div>
            <ContactForm />
        </div>
        <div className='navbar'>
        <div className="footer-brand">
            <strong>Classic Tree Service</strong>
            <span>Affordable tree trimming, removal, stump grinding, and palm tree care.</span>
            <a href="tel:+12096050373">(209) 605-0373</a>
        </div>
        <nav>
            <ul>
                <li className={location ==='/' ? "active": ''}> <Link href='/'>Home</Link></li>
                <li className={location ==='/about' ? "active": ''}> <Link href='/about'>About</Link></li>
                <li className={location ==='/contact' ? "active": ''}> <Link href='/contact'>Contact</Link></li>
            </ul>
        </nav>
        </div>
        <div className="footer-seo-links">
            <div>
                <h3>Tree Services</h3>
                <ul>
                    {treeServices.map((service) => (
                        <li key={service.slug}>
                            <Link href={`/services/${service.slug}`}>{service.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Service Areas</h3>
                <ul>
                    {serviceAreas.map((area) => (
                        <li key={area.slug}>
                            <Link href={`/service-areas/${area.slug}`}>{area.name}, {area.region}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        
    </footer>
  )
}

export default Footer
