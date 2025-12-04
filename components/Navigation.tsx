import Link from 'next/link';
import styles from './Navigation.module.css';
import BurgerMenu from './BurgerMenu';

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.fullMenu}>
        <ul className={styles.list}>
          <li className={styles.item}><Link href="/subscription" legacyBehavior><a>Monthly subscription</a></Link></li>
          <li className={styles.item}><Link href="/category" legacyBehavior><a>Category</a></Link></li>
          <li className={styles.item}><Link href="/contact" legacyBehavior><a>Contact</a></Link></li>
          <li className={styles.item}>
            <Link href="/cart" legacyBehavior>
              <a>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </a>
            </Link>
          </li>
        </ul>
      </div>
      <BurgerMenu />
    </nav>
  );
};

export default Navigation;
