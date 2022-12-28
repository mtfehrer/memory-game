"use client";

import styles from "../../styles/Levels.module.css";
import LevelPreview from "../../components/LevelPreview";
import levelsData from "../../data/LevelsData.json";

import { useEffect } from "react";

export default function Levels() {
    let levelPreviews: JSX.Element[] = [];

    useEffect(() => {
        if (!localStorage.getItem("unlocked-levels")) {
            localStorage.setItem("unlocked-levels", "[1]");
        }
    }, []);

    for (let i = 1; i <= 6; i++) {
        levelPreviews.push(
            <LevelPreview
                level={i}
                unlocked={false}
                stars={0}
                difficulty="Easy"
                key={i}
            />
        );
    }

    return (
        <div className={"header-margin " + styles.container}>
            <div className={styles.grid_container}>
                {levelPreviews.map((l) => l)}
            </div>
        </div>
    );
}
