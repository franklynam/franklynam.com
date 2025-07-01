'use client';

import Image from 'next/image';
import styles from './header.module.css';
import { useState } from 'react';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <header>
            <nav style={{width: '100%', background: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem 1rem 1rem 0', position: 'absolute', top: 0, left: 0, zIndex: 10}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '2rem', flex: 1, marginLeft: '1rem'}}>
                    <a href="/" style={{display: 'flex', alignItems: 'center'}}>
                        <Image src="/title+logo.png" alt="Logo" height={30} width={140} style={{height: 30, width: 'auto', objectFit: 'contain'}} className={styles.headerFullLogo} />
                        <Image src="/logo.png" alt="Logo" height={40} width={40} style={{height: 40, width: 40, objectFit: 'contain'}} className={styles.headerMobileLogo} />
                    </a>
                </div>
                <ul className={styles.navLinks} style={{display: 'flex', gap: '2.5rem', listStyle: 'none', fontSize: '1.2rem', fontWeight: 400, color: '#ededed', margin: 0}}>
                    <li><a href="/">HOME</a></li>
                    <li><a href="/about">ABOUT</a></li>
                    <li><a href="/contact">CONTACT</a></li>
                    <li><a href="/blog">BLOG</a></li>
                </ul>
                <button className={styles.hamburger} aria-label="Open menu" onClick={() => setMenuOpen(v => !v)}>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                </button>
                {menuOpen && (
                    <div className={styles.dropdownMenu}>
                        <a href="/" onClick={() => setMenuOpen(false)}>HOME</a>
                        <a href="/about" onClick={() => setMenuOpen(false)}>ABOUT</a>
                        <a href="/contact" onClick={() => setMenuOpen(false)}>CONTACT</a>
                        <a href="/blog" onClick={() => setMenuOpen(false)}>BLOG</a>
                    </div>
                )}
            </nav>
        </header>
    );
}