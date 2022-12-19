"use client";

import styles from "../../styles/Levels.module.css";
import LevelPreview from "../../components/LevelPreview";

import { useEffect } from "react";

export default function Levels() {
    useEffect(() => {
        if (!localStorage.getItem("unlocked-levels")) {
            localStorage.setItem("unlocked-levels", "[1]");
        }
    }, []);

    return (
        <div className={"header-margin " + styles.container}>
            <div className={styles.grid_container}>
                <LevelPreview
                    level={1}
                    unlocked={false}
                    stars={0}
                    difficulty="Easy"
                />
            </div>
        </div>
    );
}
