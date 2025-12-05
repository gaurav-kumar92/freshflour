'use client';

import { useState } from 'react';
import Link from 'next/link';
import BurgerMenu from './BurgerMenu';
import styles from './Navigation.module.css';

const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <BurgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
            {isOpen && (
                <div className={styles.mobileLinks}>
                    <Link href="/subscription">Monthly subscription</Link>
                    {/* Since CategoryDropdown is a Server Component, we can't render it directly here. */}
                    {/* For mobile, we can link to a dedicated categories page instead. */}
                    <Link href="/categories">Categories</Link>
                    <Link href="/contact">Contact</Link>
                </div>
            )}
        </>
    );
};

export default MobileNav;
