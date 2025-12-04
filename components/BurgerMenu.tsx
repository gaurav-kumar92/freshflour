
import styles from './BurgerMenu.module.css';

const BurgerMenu = ({ isOpen, setIsOpen }) => {
  return (
    <div className={styles.burgerMenu} onClick={() => setIsOpen(!isOpen)}>
      <div className={isOpen ? styles.line1Open : styles.line}></div>
      <div className={isOpen ? styles.line2Open : styles.line}></div>
      <div className={isOpen ? styles.line3Open : styles.line}></div>
    </div>
  );
};

export default BurgerMenu;
