import Logo from '../components/Logo';
import Navigation from '../components/Navigation';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <header className={styles.header}>
      <Logo />
      <Navigation />
    </header>
  );
}
