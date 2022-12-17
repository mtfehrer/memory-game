//next.js bug: links don't work
//import Link from "next/link";
//<Link href="/">Memory</Link>
//<Link href="/stats">Stats</Link>

import styles from "../styles/Navbar.module.css";

export default function Navbar() {
    return (
        <div className={styles.container}>
            <a className={styles.link} href="/">
                Memory
            </a>
            <a className={styles.link} href="levels">
                Levels
            </a>
            <a className={styles.link} href="stats">
                Stats
            </a>
        </div>
    );
}
