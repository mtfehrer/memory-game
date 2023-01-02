"use client";

import "../../styles/globals.css";
import styles from "../../styles/Levels.module.css";
import LevelPreview from "../../components/LevelPreview";
import levelsData from "../../data/LevelsData.json";
import initialUserData from "../../data/InitialUserData.json";

import { useEffect } from "react";

export default function Levels() {
    let levelPreviews: JSX.Element[] = [];

    useEffect(() => {
        if (!localStorage.getItem("unlocked-levels")) {
            localStorage.setItem("unlocked-levels", "[1]");
        }
        if (!localStorage.getItem("userData")) {
            localStorage.setItem("userData", JSON.stringify(initialUserData));
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
