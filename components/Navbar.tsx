import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import ClearLocalStorageButton from "../components/ClearLocalStorageButton";

export default function Navbar() {
    return (
        <div className={styles.container}>
            <Link className={styles.link} href="/">
                Memory
            </Link>
            <Link className={styles.link} href="levels">
                Levels
            </Link>
            <Link className={styles.link} href="stats">
                Stats
            </Link>
            <ClearLocalStorageButton />
        </div>
    );
}
